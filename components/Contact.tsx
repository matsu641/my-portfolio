"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const links = [
  {
    name: "GitHub",
    url: "https://github.com/matsu641",
    description: "View my code and contributions",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/misumi-matsudo-22b97a333/",
    description: "Professional background",
  },
  {
    name: "Email",
    url: "mailto:misumimatsudo@gmail.com",
    description: "misumimatsudo@gmail.com",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold mb-6">
            Let's Talk
          </motion.h2>
          
          <motion.p variants={item} className="text-xl text-muted mb-12 max-w-2xl">
            I'm open to new opportunities and interesting projects.
            Feel free to reach out.
          </motion.p>

          <motion.div variants={item} className="space-y-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className="block p-6 border border-foreground/10 rounded-lg hover:border-accent/30 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-muted">{link.description}</p>
                  </div>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 pt-8 border-t border-foreground/10 text-center"
      >
        <p className="text-sm text-muted">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </motion.footer>
    </section>
  );
}
