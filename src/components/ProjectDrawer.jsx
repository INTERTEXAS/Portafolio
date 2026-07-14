import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Shield, Layers, HelpCircle, Lightbulb, GitBranch, ExternalLink, Code } from 'lucide-react';

export default function ProjectDrawer({ project, onClose }) {
  // Lock scroll on body when drawer is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-40 cursor-pointer"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-bg-dark border-l border-primary-green/30 z-50 shadow-2xl flex flex-col font-mono text-xs text-slate-300"
          >
            {/* Ambient effects inside drawer */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

            {/* Header: Window Actions */}
            <div className="bg-slate-900 px-6 py-4 border-b border-primary-green/20 flex justify-between items-center z-10">
              <div className="flex items-center gap-2 text-primary-green">
                <GitBranch size={16} className="animate-pulse" />
                <span>INSPECTOR_DE_SISTEMAS // {project.id.toUpperCase()}</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded border border-primary-green/20 hover:border-accent-amber hover:text-accent-amber bg-slate-950/60 transition-all cursor-pointer flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Content Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar z-10">
              
              {/* Project Title Block */}
              <div className="space-y-2 border-b border-primary-green/15 pb-6">
                <span className="text-[10px] text-accent-amber border border-accent-amber/20 bg-accent-amber/5 px-2 py-0.5 rounded">
                  MODULO_CATALOGO: {project.category.toUpperCase()}
                </span>
                <h2 className="text-2xl font-bold text-white font-mono mt-2">
                  {project.title}
                </h2>
                <p className="text-primary-green text-sm">
                  {project.subtitle}
                </p>
              </div>

              {/* Problem & Solution Double Panel */}
              <div className="grid grid-cols-1 gap-4">
                {/* Problem */}
                <div className="bg-slate-950/40 border border-red-500/20 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-[10px]">
                    <HelpCircle size={14} />
                    <span>EL_DESAFIO (DIAGNÓSTICO_PROBLEMA)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-slate-950/40 border border-primary-green/20 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-primary-green font-bold text-[10px]">
                    <Lightbulb size={14} />
                    <span>LA_IMPLEMENTACION (RESOLUCIÓN)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Technical Architecture Block */}
              <div className="bg-slate-950/60 border border-primary-green/15 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-primary-green font-bold text-[10px] border-b border-primary-green/10 pb-2">
                  <Server size={14} />
                  <span>DIAGRAMA_ARQUITECTURA_MODULAR</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {project.architecture}
                </p>
                
                {/* Code Terminal Output Mock */}
                <div className="bg-slate-950/90 p-3 rounded border border-primary-green/10 text-[10px] text-slate-400 font-mono space-y-1 mt-2">
                  <div className="text-slate-500">// Simulación de conexion de puerto de red</div>
                  <div>$ ping -c 1 core.db.portafolio</div>
                  <div className="text-primary-green">64 bytes from 10.0.8.21: icmp_seq=1 ttl=64 time=0.045 ms</div>
                  <div>$ get_subsystem_health --target={project.id}</div>
                  <div className="text-accent-amber">HEALTH_CHECK: STATUS_OK (100% operative)</div>
                </div>
              </div>

              {/* Tech Stack Box */}
              <div className="space-y-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  [ COMPONENTES_DEL_STACK ]
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-primary-green/20 bg-slate-900/60 text-slate-300 hover:border-accent-amber transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="bg-slate-900 p-6 border-t border-primary-green/20 flex gap-4">
              <a
                href="#"
                className="flex-1 px-4 py-3 rounded border border-accent-amber bg-accent-amber/10 hover:bg-accent-amber hover:text-slate-950 text-accent-amber font-bold text-center flex items-center justify-center gap-2 transition-all glow-amber duration-300"
              >
                PROBAR_LIVE
                <ExternalLink size={14} />
              </a>
              <a
                href="#"
                className="flex-1 px-4 py-3 rounded border border-primary-green bg-transparent hover:bg-primary-green/10 text-primary-green font-bold text-center flex items-center justify-center gap-2 transition-all"
              >
                VER_REPOSITORIO
                <Code size={14} />
              </a>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
