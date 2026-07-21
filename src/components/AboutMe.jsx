import React from 'react';
import { motion } from 'framer-motion';
import { User, Eye, Network, Cpu, Database, Layout, Terminal, Code2, Layers } from 'lucide-react';
import { aboutMe } from '../data/data';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
};

export default function AboutMe() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-green/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-3 mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-mono text-primary-green">
            <Terminal size={14} className="animate-pulse" />
            <span>[ ARQUITECTURA_DE_PERFIL ]</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-white font-heading">
            Perfil & Enfoque
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-sm max-w-2xl font-body leading-relaxed">
            Fundamentos de ingeniería, metodologías visuales y visión sistémica del software.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left: Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-7 glass-panel rounded-2xl p-8 border border-primary-green/20 flex flex-col justify-between relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.3)]"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-primary-green/15 pb-4">
                <span className="text-xs font-mono text-primary-green font-semibold flex items-center gap-2">
                  <Eye size={15} className="text-accent-amber" />
                  PERSPECTIVA_Y_METODOLOGÍA
                </span>
                <span className="text-[10px] font-mono text-accent-amber bg-accent-amber/10 border border-accent-amber/25 px-2.5 py-1 rounded-md font-bold">
                  JR_FULL-STACK
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white font-heading">
                  Aprendizaje Visual & Arquitectura
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-body">
                  {aboutMe.bio}
                </p>
              </div>

              {/* Highlight Cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
              >
                {[
                  { icon: <Network size={15} />, title: 'Modelado Relacional', desc: 'PostgreSQL con integridad y esquemas optimizados.' },
                  { icon: <Layout size={15} />, title: 'Diagramas de Flujo', desc: 'Requisitos y flujos de trabajo visualizados.' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="p-4 rounded-xl bg-slate-950/50 border border-primary-green/15 space-y-1.5 hover:border-primary-green/40 transition-colors"
                  >
                    <div className="text-primary-green font-bold font-mono text-xs flex items-center gap-2">
                      <span className="text-accent-amber">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-body leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Status bar */}
            <div className="mt-8 pt-4 border-t border-primary-green/10 flex justify-between items-center font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                DISPONIBLE PARA OPORTUNIDADES
              </span>
              <span className="text-accent-amber font-semibold">REACT + PYTHON + POSTGRESQL</span>
            </div>
          </motion.div>

          {/* Right: Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-primary-green/20 flex flex-col justify-between relative overflow-hidden bg-slate-950/40 shadow-[0_0_60px_rgba(0,0,0,0.3)]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-primary-green/15 pb-3 font-mono text-xs">
                <span className="text-primary-green font-bold flex items-center gap-2">
                  <Layers size={15} />
                  DIAGRAMA_DE_CAPAS
                </span>
                <span className="text-slate-500 text-[10px]">[ARQUITECTURA]</span>
              </div>

              {/* Architecture Layers with connecting lines */}
              <div className="space-y-2 font-mono text-xs">
                {[
                  { icon: <Code2 size={14} />, label: 'CAPA 1: INTERFAZ', tag: 'FRONTEND', color: 'teal', desc: 'React 19, Tailwind CSS, Framer Motion' },
                  { icon: <Cpu size={14} />, label: 'CAPA 2: LÓGICA', tag: 'BACKEND', color: 'amber', desc: 'Python, APIs RESTful, Automatización' },
                  { icon: <Database size={14} />, label: 'CAPA 3: DATOS', tag: 'DATABASE', color: 'emerald', desc: 'PostgreSQL, Modelos entidad-relación' }
                ].map((layer, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                      className={`p-3.5 rounded-xl bg-slate-900/60 border border-${layer.color}-500/25 hover:border-${layer.color}-400/60 transition-all duration-400 space-y-1.5`}
                    >
                      <div className={`flex justify-between items-center text-${layer.color}-400 font-bold`}>
                        <span className="flex items-center gap-1.5">{layer.icon} {layer.label}</span>
                        <span className={`text-[10px] bg-${layer.color}-500/10 px-1.5 py-0.5 rounded`}>{layer.tag}</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">{layer.desc}</div>
                    </motion.div>
                    {i < 2 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="flex justify-center py-0.5"
                      >
                        <div className="w-[2px] h-6 bg-gradient-to-b from-primary-green/50 to-primary-green/10 rounded-full" />
                      </motion.div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Skill Pills */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6 pt-4 border-t border-primary-green/10 flex flex-wrap gap-2"
            >
              {aboutMe.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  variants={fadeUp}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-primary-green/15 text-slate-300 font-mono text-[10px] hover:border-accent-amber hover:text-accent-amber transition-all duration-300 cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
