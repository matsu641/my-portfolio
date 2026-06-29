"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useLanguage } from "@/contexts/LanguageContext";

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
      // 8の字軌道（リサジュー曲線）- 左上側を大きく動く
      meshRef.current.position.x = Math.sin(time * 0.5) * 3.5 - 2;
      meshRef.current.position.y = Math.sin(time * 1) * 2.5 + 1;
      meshRef.current.position.z = Math.cos(time * 0.5) * 2;
      
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
        color="#00D9FF"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#00D9FF"
        emissiveIntensity={0.5}
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
      // 円軌道 - 右側を大きく動く
      const radius = 4;
      meshRef.current.position.x = Math.cos(time * 0.4) * radius + 1;
      meshRef.current.position.y = Math.sin(time * 0.6) * 2.5 - 0.5;
      meshRef.current.position.z = Math.sin(time * 0.4) * 2.5;
      
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
        color="#14B8A6"
        metalness={0.9}
        roughness={0.1}
        emissive="#14B8A6"
        emissiveIntensity={0.6}
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
      // 螺旋軌道 - 下側を大きく動く
      const radius = 3.5;
      meshRef.current.position.x = Math.cos(time * 0.6) * radius;
      meshRef.current.position.y = Math.sin(time * 0.8) * 2.8 - 1.2;
      meshRef.current.position.z = Math.sin(time * 0.6) * 2.2;
      
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
        color="#10B981"
        metalness={0.8}
        roughness={0.2}
        emissive="#10B981"
        emissiveIntensity={0.5}
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
        color="#00F0FF"
        transparent
        opacity={0.7}
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
      camera={{ position: [0, 0, 8], fov: 80 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#00D9FF" />
      <pointLight position={[10, -10, 5]} intensity={1} color="#10B981" />
      <GeometricShapes />
      <ParticleField />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedSubtitle, setDisplayedSubtitle] = useState("");
  const [isTypingTitle, setIsTypingTitle] = useState(true);
  const [isTypingSubtitle, setIsTypingSubtitle] = useState(false);
  const { t } = useLanguage();

  // タイピングアニメーション
  useEffect(() => {
    const titleText = t('hero.title');
    const subtitleText = t('hero.subtitle');
    let titleIndex = 0;
    let subtitleIndex = 0;

    // まずタイトルをリセット
    setDisplayedTitle("");
    setDisplayedSubtitle("");
    setIsTypingTitle(true);
    setIsTypingSubtitle(false);

    // タイトルのタイピング
    const titleInterval = setInterval(() => {
      if (titleIndex < titleText.length) {
        setDisplayedTitle(titleText.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleInterval);
        setIsTypingTitle(false);
        
        // タイトル完了後、少し待ってからサブタイトル開始
        setTimeout(() => {
          setIsTypingSubtitle(true);
          const subtitleInterval = setInterval(() => {
            if (subtitleIndex < subtitleText.length) {
              setDisplayedSubtitle(subtitleText.slice(0, subtitleIndex + 1));
              subtitleIndex++;
            } else {
              clearInterval(subtitleInterval);
              setIsTypingSubtitle(false);
            }
          }, 100);
        }, 300); // 300ms待機
      }
    }, 120);

    return () => {
      clearInterval(titleInterval);
    };
  }, [t]);

  return (
    <section id="home" className="relative min-h-screen scroll-mt-24 flex items-center justify-center px-6 md:px-8 overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-teal-950">
      {/* 3D背景 - 明るく表示 */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* オーバーレイグラデーション - 軽く */}
      <div 
        className="absolute inset-0 z-[1] bg-gradient-to-br from-cyan-950/40 via-transparent to-emerald-950/40 pointer-events-none"
      />

      {/* コンテンツ - ガラスモーフィズム */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* ガラス効果用の外側グロー */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] via-cyan-500/[0.05] to-emerald-500/[0.08] p-8 md:p-12 rounded-3xl border-2 border-white/30 shadow-[0_8px_32px_0_rgba(0,217,255,0.2)] before:absolute before:inset-0 before:rounded-3xl before:p-[2px] before:bg-gradient-to-br before:from-cyan-400/40 before:via-transparent before:to-emerald-400/40 before:-z-10"
          style={{
            boxShadow: '0 8px 32px 0 rgba(0, 217, 255, 0.2), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2)'
          }}
        >

          {/* 挨拶と名前 */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-muted mb-4 tracking-wide"
          >
            {t('hero.greeting')}<span className="text-foreground font-large">{t('hero.name')}</span>
          </motion.p>

          {/* タイトル - タイピングアニメーション */}
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block">
              {displayedTitle}
              {isTypingTitle && <span className="animate-pulse">|</span>}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
              {displayedSubtitle}
              {isTypingSubtitle && <span className="animate-pulse">|</span>}
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted max-w-2xl mb-8"
          >
            {t('hero.description')}
          </motion.p>

        </motion.div>
      </div>

      {/* スクロールダウン矢印 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="/#projects"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted hover:text-foreground transition-colors cursor-pointer group"
        >
          <span className="text-sm tracking-wider opacity-70 group-hover:opacity-100">Scroll Down</span>
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
