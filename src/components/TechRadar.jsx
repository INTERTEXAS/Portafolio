import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Sparkles, Layers, Radio } from 'lucide-react';
import { skills } from '../data/data';

const SKILL_DESCRIPTIONS = {
  "React": "SPAs modulares de alto rendimiento con hooks personalizados y renderizado reactivo.",
  "Python": "Microservicios robustos, automatizaciones asíncronas y APIs de alta disponibilidad.",
  "PostgreSQL": "Modelado relacional, optimización de queries complejas y transacciones ACID.",
  "Tailwind CSS": "Sistemas de diseño escalables e interfaces responsivas de producción.",
  "Framer Motion": "Animaciones fluidas de alto rendimiento y transiciones complejas de layouts.",
  "Arquitectura de Datos": "Modelos entidad-relación, normalización y tuberías de procesamiento.",
};

/* Animated Counter */
function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setHasStarted(false);
    setCount(0);
    const timer = setTimeout(() => setHasStarted(true), 50);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = parseInt(value);
    const stepTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value, duration, hasStarted]);

  return <span>{count}</span>;
}

export default function TechRadar() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  return (
    <section id="tech-radar" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-primary-green/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary-green font-semibold">
            <Radio size={15} className="animate-pulse text-accent-amber" />
            <span>[ RADAR_TECNOLÓGICO ]</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-heading">
            Stack Técnico
          </h2>
          <p className="text-slate-400 max-w-xl text-sm font-body">
            Mapa interactivo de competencias con niveles de dominio y profundidad de implementación.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Radar Visualization */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-primary-green/20 relative overflow-hidden flex flex-col items-center justify-center min-h-[480px] shadow-[0_0_60px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

            {/* Radar Container */}
            <div className="relative w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full flex items-center justify-center">
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-primary-green/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]" />
              <div className="absolute w-[270px] h-[270px] rounded-full border border-primary-green/25" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-primary-green/20" />
              <div className="absolute w-[90px] h-[90px] rounded-full border border-primary-green/15" />

              {/* Crosshairs */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-primary-green/40 via-primary-green/15 to-primary-green/40" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-primary-green/40 via-primary-green/15 to-primary-green/40" />

              {/* Sonar Pulses */}
              {[0, 2.5, 5].map((delay) => (
                <motion.div
                  key={delay}
                  className="absolute rounded-full border border-primary-green/40 bg-transparent pointer-events-none"
                  initial={{ width: '0px', height: '0px', opacity: 0.6 }}
                  animate={{ width: '100%', height: '100%', opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 7.5, ease: "easeOut", delay }}
                />
              ))}

              {/* Sweep Beam */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(16,185,129,0.18) 0deg, rgba(16,185,129,0.03) 25deg, transparent 55deg, transparent 360deg)'
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />

              {/* Sweep Line */}
              <motion.div
                className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-t from-primary-green/80 via-emerald-400/60 to-transparent origin-bottom pointer-events-none z-20"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />

              {/* Center */}
              <div className="absolute w-4 h-4 rounded-full bg-bg-dark border-2 border-primary-green shadow-[0_0_15px_rgba(16,185,129,0.5)] z-30 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-pulse" />
              </div>

              {/* Skill Nodes */}
              {skills.map((skill, idx) => {
                const angle = (idx * (360 / skills.length)) * Math.PI / 180;
                const radius = 75 + ((idx % 3) * 30);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isSelected = selectedSkill.name === skill.name;
                const angleDeg = idx * (360 / skills.length);

                let labelPos = "-top-7 left-1/2 -translate-x-1/2";
                if (angleDeg >= 30 && angleDeg < 150) labelPos = "top-6 left-1/2 -translate-x-1/2";
                else if (angleDeg >= 150 && angleDeg < 210) labelPos = "right-7 top-1/2 -translate-y-1/2";
                else if (angleDeg >= 210 && angleDeg < 330) labelPos = "-top-7 left-1/2 -translate-x-1/2";
                else labelPos = "left-7 top-1/2 -translate-y-1/2";

                return (
                  <motion.button
                    key={skill.name}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 z-30 ${
                      isSelected
                        ? "bg-accent-amber border-2 border-white shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-125"
                        : "bg-primary-green/80 border border-emerald-300/50 shadow-[0_0_8px_rgba(16,185,129,0.5)] hover:scale-125 hover:bg-accent-amber"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px - 8px)`,
                      top: `calc(50% + ${y}px - 8px)`
                    }}
                    onClick={() => setSelectedSkill(skill)}
                    whileHover={{ scale: 1.3 }}
                  >
                    <span className={`absolute ${labelPos} text-[10px] font-mono whitespace-nowrap px-2 py-0.5 rounded-md border font-bold shadow-md transition-all ${
                      isSelected
                        ? "border-accent-amber text-accent-amber bg-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.3)] z-40"
                        : "border-primary-green/30 text-slate-300 bg-slate-950/90"
                    }`}>
                      {skill.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer status */}
            <div className="w-full mt-6 border-t border-primary-green/15 pt-4 flex flex-wrap justify-between items-center text-xs font-mono text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                <span className="text-primary-green font-semibold">SONAR: 360°</span>
              </div>
              <div className="text-accent-amber font-semibold">NODOS: [{skills.length}] ONLINE</div>
            </div>
          </div>

          {/* Right: Skill Details */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Selector Grid */}
            <div className="glass-panel rounded-2xl p-5 border border-primary-green/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-3 font-bold">
                [ SELECCIONAR_TECNOLOGÍA ]
              </span>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => {
                  const isSelected = selectedSkill.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className={`p-3 rounded-xl text-left text-xs font-mono border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "bg-accent-amber/10 border-accent-amber text-accent-amber font-bold shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                          : "bg-slate-950/40 border-primary-green/15 text-slate-300 hover:border-primary-green/40 hover:text-white"
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details Card */}
            <div className="glass-panel rounded-2xl p-6 border border-primary-green/20 flex-1 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.3)]">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-primary-green/15 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-primary-green uppercase tracking-wider block font-bold">
                      {selectedSkill.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-heading mt-1">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-accent-amber/30 font-mono text-xs text-accent-amber font-bold">
                    <Sparkles size={13} />
                    <span><AnimatedCounter value={selectedSkill.level} />%</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed font-body">
                  {SKILL_DESCRIPTIONS[selectedSkill.name] || "Configuración avanzada enfocada a altos requerimientos."}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-4 border-t border-primary-green/15 space-y-3">
                <div className="flex justify-between text-xs font-mono text-slate-300 font-semibold">
                  <span>DOMINIO</span>
                  <span className="text-accent-amber">{selectedSkill.level}/100</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full border border-primary-green/20 overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-green via-teal-400 to-accent-amber rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    key={selectedSkill.name}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  />
                </div>

                <div className="bg-slate-950/80 p-3 rounded-lg border border-primary-green/15 text-[10px] text-slate-400 font-mono space-y-1">
                  <div className="text-slate-500 font-bold">// TELEMETRÍA</div>
                  <div className="text-primary-green font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-pulse" />
                    NODO VERIFICADO [ONLINE]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
