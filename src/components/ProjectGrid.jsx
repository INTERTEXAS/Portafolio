import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/data';
import { Terminal, Eye, ShieldAlert, Layers, ArrowUpRight } from 'lucide-react';

const CATEGORY_COLORS = {
  Enterprise: "border-emerald-500/35 text-emerald-400 bg-emerald-500/10",
  "AI & Engineering": "border-amber-500/35 text-amber-400 bg-amber-500/10",
  "Logic & Health": "border-teal-500/35 text-teal-400 bg-teal-500/10",
  Analytics: "border-yellow-500/35 text-yellow-400 bg-yellow-500/10"
};

/* 3D Tilt Card with Spotlight */
function TiltCard({ children, onClick }) {
  const ref = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
    setSpotlightPos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
    setIsHovering(false);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...tiltStyle,
        transition: isHovering ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
      }}
      onMouseMove={(e) => { handleMouseMove(e); setIsHovering(true); }}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Spotlight effect */}
      {isHovering && (
        <div
          className="absolute w-[350px] h-[350px] rounded-full pointer-events-none z-0"
          style={{
            left: spotlightPos.x - 175,
            top: spotlightPos.y - 175,
            background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
          }}
        />
      )}
      {children}
    </div>
  );
}

export default function ProjectGrid({ onProjectSelect }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Enterprise", "AI & Engineering", "Logic & Health", "Analytics"];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-amber/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-primary-green">
              <Terminal size={14} className="animate-pulse" />
              <span>[ CATÁLOGO_CORE ]</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-heading">
              Proyectos
            </h2>
            <p className="text-slate-400 text-sm max-w-xl font-body">
              Soluciones diseñadas para resolver desafíos técnicos reales.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                  filter === cat
                    ? "border-accent-amber text-accent-amber bg-accent-amber/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] font-bold"
                    : "border-primary-green/15 text-slate-400 bg-slate-950/40 hover:border-primary-green/40 hover:text-white"
                }`}
              >
                {cat === "All" ? "TODOS" : cat.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid with 3D Tilt */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TiltCard onClick={() => onProjectSelect(project)}>
                  <div className="glass-card rounded-2xl p-7 flex flex-col justify-between min-h-[300px] relative overflow-hidden border border-primary-green/20 hover:border-accent-amber/40 transition-all duration-500">
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-primary-green/3 rounded-bl-full pointer-events-none group-hover:bg-accent-amber/6 transition-colors duration-700" />

                    <div className="space-y-5 relative z-10">
                      {/* Category Tag */}
                      <div className="flex justify-between items-center font-mono text-xs">
                        <span className={`px-3 py-1 rounded-lg font-semibold border ${CATEGORY_COLORS[project.category] || "border-primary-green/30 text-primary-green"}`}>
                          {project.category.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                          <span>ONLINE</span>
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-accent-amber transition-colors duration-300 font-heading flex items-center justify-between">
                          <span>{project.title}</span>
                          <ArrowUpRight size={22} className="text-slate-600 group-hover:text-accent-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </h3>
                        <p className="text-xs text-primary-green/80 font-mono mt-1 font-semibold">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Reto */}
                      <div className="bg-slate-950/60 border border-primary-green/10 p-3.5 rounded-xl space-y-1">
                        <div className="text-[11px] font-mono text-accent-amber font-bold flex items-center gap-1.5">
                          <Terminal size={12} />
                          <span>RETO:</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed font-body line-clamp-2">
                          {project.reto}
                        </p>
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="mt-6 pt-4 border-t border-primary-green/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-slate-400 bg-slate-900/80 border border-primary-green/15 px-2 py-0.5 rounded-md font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="text-[10px] text-slate-500 px-1 font-mono">+{project.stack.length - 4}</span>
                        )}
                      </div>

                      <span className="text-accent-amber text-xs font-bold font-mono flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        INSPECCIONAR
                        <Eye size={13} />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="glass-panel p-14 rounded-2xl border border-red-500/20 text-center font-mono text-xs text-slate-400 space-y-3">
            <ShieldAlert className="mx-auto text-red-500 animate-bounce" size={28} />
            <div>SIN RESULTADOS EN ESTA CATEGORÍA</div>
          </div>
        )}
      </div>
    </section>
  );
}
