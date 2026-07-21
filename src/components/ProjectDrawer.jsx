import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Lightbulb, GraduationCap, GitBranch, CheckCircle2 } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.33, 1, 0.68, 1] }
  })
};

export default function ProjectDrawer({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[620px] bg-bg-dark z-50 shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Background textures */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

            {/* Header */}
            <div className="bg-slate-950 px-6 py-4 border-b border-primary-green/20 flex justify-between items-center z-10">
              <div className="flex items-center gap-2.5 font-mono text-xs text-primary-green font-bold">
                <GitBranch size={16} className="text-accent-amber" />
                <span>DETALLE // {project.id.toUpperCase()}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-primary-green/20 hover:border-accent-amber hover:text-accent-amber bg-slate-900 transition-all cursor-pointer text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar z-10">

              {/* Title Block */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-3 border-b border-primary-green/15 pb-6"
              >
                <span className="inline-block text-[10px] text-accent-amber border border-accent-amber/25 bg-accent-amber/10 px-3 py-1 rounded-lg font-bold font-mono tracking-wider">
                  {project.category.toUpperCase()}
                </span>
                <h2 className="text-3xl font-bold text-white font-heading">
                  {project.title}
                </h2>
                <p className="text-primary-green text-sm font-mono font-semibold">
                  {project.subtitle}
                </p>
                <p className="text-slate-300 text-xs leading-relaxed font-body pt-1">
                  {project.description}
                </p>
              </motion.div>

              {/* RETO / SOLUCIÓN / APRENDIZAJE */}
              {[
                { num: '01', label: 'EL RETO', icon: <HelpCircle size={16} />, color: 'red', borderColor: 'border-red-500/25', textColor: 'text-red-400', content: project.reto },
                { num: '02', label: 'LA SOLUCIÓN', icon: <Lightbulb size={16} />, color: 'green', borderColor: 'border-primary-green/25', textColor: 'text-primary-green', content: project.solucion },
                { num: '03', label: 'EL APRENDIZAJE', icon: <GraduationCap size={16} />, color: 'amber', borderColor: 'border-amber-500/25', textColor: 'text-accent-amber', content: project.aprendizaje }
              ].map((section, i) => (
                <motion.div
                  key={section.num}
                  custom={i + 1}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                  className={`bg-slate-950/50 border ${section.borderColor} p-5 rounded-2xl space-y-2.5 hover:shadow-lg transition-shadow duration-500`}
                >
                  <div className={`flex items-center gap-2.5 ${section.textColor} font-bold font-mono text-xs`}>
                    {section.icon}
                    <span>{section.num}. {section.label}</span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed font-body">
                    {section.content}
                  </p>
                </motion.div>
              ))}

              {/* Tech Stack */}
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-3 pt-2"
              >
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold font-mono">
                  [ TECNOLOGÍAS ]
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-primary-green/20 bg-slate-900/60 text-slate-200 font-mono text-xs hover:border-accent-amber transition-colors duration-300"
                    >
                      <CheckCircle2 size={13} className="text-primary-green" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="bg-slate-950 p-5 border-t border-primary-green/15 z-10">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl border border-primary-green/30 bg-primary-green/8 hover:bg-primary-green hover:text-slate-950 text-primary-green font-bold font-mono text-xs tracking-wider transition-all cursor-pointer"
              >
                CERRAR_PANEL
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
