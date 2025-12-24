"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// 3D幾何学オブジェクト群
function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // グループ全体をゆっくり回転
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 中央の球体 - 8の字軌道 */}
      <AnimatedSphere />
      
      {/* トーラス - 円軌道 */}
      <AnimatedTorus />
      
      {/* 立方体 - 螺旋軌道 */}
      <AnimatedBox />
    </group>
  );
}

// 8の字軌道で動く球体
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // 8の字軌道（リサジュー曲線）
      meshRef.current.position.x = Math.sin(time * 0.5) * 1.5;
      meshRef.current.position.y = Math.sin(time * 1) * 1.2;
      meshRef.current.position.z = Math.cos(time * 0.5) * 0.5;
      
      // 滑らかな回転
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[0.8, 64, 64]}
      scale={hovered ? 1.15 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#6366f1"
        emissiveIntensity={0.4}
      />
    </Sphere>
  );
}

// 円軌道で動くトーラス
function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // 円軌道
      const radius = 2;
      meshRef.current.position.x = Math.cos(time * 0.4) * radius;
      meshRef.current.position.y = Math.sin(time * 0.6) * 0.8;
      meshRef.current.position.z = Math.sin(time * 0.4) * radius;
      
      // 複雑な回転
      meshRef.current.rotation.x = time * 0.4;
      meshRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.15 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[0.5, 0.2, 16, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.9}
        roughness={0.1}
        emissive="#8b5cf6"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// 螺旋軌道で動く立方体
function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // 螺旋軌道
      const radius = 1.8;
      meshRef.current.position.x = Math.cos(time * 0.6) * radius;
      meshRef.current.position.y = Math.sin(time * 0.8) * 1.5;
      meshRef.current.position.z = Math.sin(time * 0.6) * radius;
      
      // 3軸回転
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.15 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color="#ec4899"
        metalness={0.8}
        roughness={0.2}
        emissive="#ec4899"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// パーティクル背景 - 左から右に流れる
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = new Float32Array(positions.length / 3);
      
      // パーティクルの初期位置とランダムな速度を設定
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20 - 10; // X: 左側から開始
        positions[i + 1] = (Math.random() - 0.5) * 10; // Y: ランダム
        positions[i + 2] = (Math.random() - 0.5) * 10; // Z: ランダム
        
        // 各パーティクルにランダムな速度を設定
        velocities[i / 3] = 0.3 + Math.random() * 0.5;
      }
      
      velocitiesRef.current = velocities;
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current && velocitiesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = velocitiesRef.current;
      
      // 各パーティクルを左から右に移動
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i / 3] * delta; // X座標を増加
        
        // 右端に達したら左端にリセット
        if (positions[i] > 15) {
          positions[i] = -15;
          positions[i + 1] = (Math.random() - 0.5) * 10;
          positions[i + 2] = (Math.random() - 0.5) * 10;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3Dシーンコンポーネント
function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={0.8} color="#ec4899" />
      <GeometricShapes />
      <ParticleField />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // GSAPでテキストアニメーション
    if (titleRef.current) {
      gsap.from(titleRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-8 overflow-hidden">
      {/* 3D背景 */}
      <div className="absolute inset-0 opacity-50">
        <Scene3D />
      </div>

      {/* グラデーション背景 */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 transition-all duration-300"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />

      {/* コンテンツ */}
      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 名前 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <p className="text-lg md:text-xl text-muted font-medium">
              松戸美純 / Misumi Matsudo
            </p>
          </motion.div>

          {/* タイトル */}
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block">I design systems,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              not just screens.
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted max-w-2xl mb-8"
          >
            Software engineer focused on architecture, performance, and user experience.
            I make technical decisions that scale.
          </motion.p>

          {/* メインボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              About Me
            </motion.a>
            <motion.a
              href="#skills"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:border-foreground/40 hover:bg-foreground/5 transition-all backdrop-blur-sm"
            >
              Skills
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:border-foreground/40 hover:bg-foreground/5 transition-all backdrop-blur-sm"
            >
              Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:border-foreground/40 hover:bg-foreground/5 transition-all backdrop-blur-sm"
            >
              Contact
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
