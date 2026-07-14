import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/data';
import { Terminal, Database, Code, ShieldAlert, Cpu, Eye, ExternalLink } from 'lucide-react';

const CATEGORY_COLORS = {
  Enterprise: "border-teal-500/30 text-teal-400 bg-teal-500/5",
  Automation: "border-primary-green/30 text-primary-green bg-primary-green/5",
  Frontend: "border-blue-500/30 text-blue-400 bg-blue-500/5",
  Analytics: "border-accent-amber/30 text-accent-amber bg-accent-amber/5"
};

const CATEGORY_ICONS = {
  Enterprise: <Database size={12} />,
  Automation: <Cpu size={12} />,
  Frontend: <Code size={12} />,
  Analytics: <Terminal size={12} />
};

export default function ProjectGrid({ onProjectSelect }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Enterprise", "Automation", "Frontend", "Analytics"];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 relative border-t border-primary-green/10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary-green">
              <Terminal size={14} className="animate-pulse" />
              <span>[ REGISTRO_DE_PROYECTOS_DE_INGENIERIA ]</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-mono">
              CATÁLOGO DE PRODUCTOS
            </h2>
            <p className="text-slate-400 font-mono text-sm max-w-xl">
              Nodos operativos y herramientas construidas para automatización y optimización de software.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
                  filter === cat
                    ? "border-accent-amber text-accent-amber bg-accent-amber/10 shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                    : "border-primary-green/20 text-slate-400 bg-slate-900/40 hover:border-primary-green/50 hover:text-white"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                onClick={() => onProjectSelect(project)}
                className="glass-card rounded-lg p-5 flex flex-col justify-between min-h-[280px] cursor-pointer group relative"
              >
                {/* Visual scanlines/grid inside card on hover */}
                <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

                {/* Card Top */}
                <div className="space-y-4">
                  {/* Category Tag & Status Tag */}
                  <div className="flex justify-between items-center font-mono text-[10px]">
                    <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[project.category]}`}>
                      {CATEGORY_ICONS[project.category]}
                      <span>{project.category.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-pulse" />
                      <span>SISTEMA_OK</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-amber transition-colors font-mono line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-primary-green/80 font-mono mt-0.5 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-slate-300 text-xs font-mono leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Card Bottom / Footer telemetry */}
                <div className="mt-6 pt-4 border-t border-primary-green/10 flex justify-between items-center">
                  {/* Stacks badges preview */}
                  <div className="flex gap-1 overflow-hidden">
                    {project.stack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono text-slate-400 bg-slate-900 border border-primary-green/10 px-1.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-[9px] font-mono text-slate-500 px-1 py-0.5">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Interactive Trigger Arrow */}
                  <span className="text-accent-amber opacity-60 group-hover:opacity-100 font-mono text-xs flex items-center gap-1.5 transition-all group-hover:translate-x-1">
                    INSPECCIONAR
                    <Eye size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty status check */}
        {filteredProjects.length === 0 && (
          <div className="glass-panel p-12 rounded-lg border border-red-500/20 text-center font-mono text-xs text-slate-400 space-y-2">
            <ShieldAlert className="mx-auto text-red-500 animate-bounce" size={24} />
            <div>ERROR_REGISTRO: CERO NODOS ENCONTRADOS</div>
            <div className="text-slate-500">Intenta reconfigurar el filtro superior.</div>
          </div>
        )}
      </div>
    </section>
  );
}
