import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Disc, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { skills } from '../data/data';

// Map icons to categories
const CATEGORY_ICONS = {
  Frontend: <Layers size={16} className="text-teal-400" />,
  Backend: <Terminal size={16} className="text-primary-green" />,
  Database: <Cpu size={16} className="text-blue-400" />,
  Workflow: <Disc size={16} className="text-accent-amber" />,
  Hardware: <ShieldAlert size={16} className="text-red-400" />
};

const SKILL_DESCRIPTIONS = {
  "React": "Desarrollo de SPAs modulares de alto rendimiento utilizando patrones de estado avanzados, hooks personalizados y renderizado reactivo.",
  "Python": "Construcción de microservicios robustos, automatizaciones de sistemas asíncronos y APIs de alta disponibilidad.",
  "PostgreSQL": "Modelado de base de datos relacionales, optimización de queries complejas, transacciones ACID seguras e indexación de tablas.",
  "Tailwind CSS": "Creación de sistemas de diseño escalables, interfaces responsivas a la medida y optimización de bundle CSS.",
  "Framer Motion": "Orquestación de animaciones web fluidas de alto rendimiento y transiciones complejas de layouts interactivos.",
  "Git / GitHub": "Control de versiones avanzado, flujos de trabajo colaborativos CI/CD, control de ramas y automatización de despliegues.",
  "Optimización de Hardware": "Diagnóstico de rendimiento a bajo nivel, configuraciones personalizadas y ensamblaje enfocado a estaciones de desarrollo.",
  "Asyncio (Python)": "Orquestación de tareas en segundo plano no bloqueantes, APIs asíncronas y scripts de telemetría y automatización masiva."
};

export default function TechRadar() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  return (
    <section id="tech-radar" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="mb-12 space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary-green">
            <Cpu size={14} className="animate-spin text-primary-green" style={{ animationDuration: '6s' }} />
            <span>[ RADAR_TECNOLOGICO_TELEMETRIA ]</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-mono">
            STACK DE HABILIDADES
          </h2>
          <p className="text-slate-400 max-w-xl text-sm font-mono">
            Mapeo interactivo de tecnologías dominantes y niveles de implementación de ingeniería.
          </p>
        </div>

        {/* Command Center Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column Left: Simulated Radar Screen (6 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-lg p-6 border border-primary-green/20 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            {/* Visual radar sweep animation */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            
            {/* Radial Radar Circles */}
            <div className="relative w-80 h-80 rounded-full border border-primary-green/10 flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-primary-green/20" />
              {/* Mid Ring */}
              <div className="absolute w-56 h-56 rounded-full border border-primary-green/15" />
              {/* Inner Ring */}
              <div className="absolute w-32 h-32 rounded-full border border-primary-green/10" />
              {/* Center Dot */}
              <div className="absolute w-4 h-4 rounded-full bg-primary-green shadow-[0_0_10px_rgba(16,185,129,0.7)] z-20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>

              {/* Scanning sweep beam */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-primary-green/10"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              />

              {/* Crosshairs */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-primary-green/10" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-primary-green/10" />

              {/* Dynamic Skill nodes scattered radially */}
              {skills.map((skill, idx) => {
                // Calculate angles/positions based on index to scatter them nicely
                const angle = (idx * (360 / skills.length) * Math.PI) / 180;
                // Radii vary from 60px to 140px based on level
                const radius = 145 - (skill.level * 0.9); 
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isSelected = selectedSkill.name === skill.name;

                return (
                  <motion.button
                    key={skill.name}
                    className={`absolute w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
                      isSelected 
                        ? "bg-accent-amber border-2 border-white shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-125" 
                        : "bg-primary-green/40 hover:bg-accent-amber/60 hover:scale-110"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px - 8px)`,
                      top: `calc(50% + ${y}px - 8px)`
                    }}
                    onClick={() => setSelectedSkill(skill)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className={`absolute -top-6 text-[9px] font-mono whitespace-nowrap px-1 rounded border bg-slate-950/80 ${
                      isSelected 
                        ? "border-accent-amber text-accent-amber" 
                        : "border-primary-green/20 text-slate-400"
                    }`}>
                      {skill.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Radar status footer bar */}
            <div className="w-full mt-6 border-t border-primary-green/15 pt-4 flex justify-between items-center text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                <span>FRECUENCIA: 2.4GHZ</span>
              </div>
              <div>MODO: ANALIZADOR_ACTIVO</div>
              <div>SENSORES: [8/8]</div>
            </div>
          </div>

          {/* Column Right: Details & Telemetry (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Quick Skill Selector Grid (for accessibility/easy navigation) */}
            <div className="glass-panel rounded-lg p-4 border border-primary-green/25">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                [ INDEXADORES_DE_SISTEMA ]
              </span>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => {
                  const isSelected = selectedSkill.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className={`flex items-center gap-2 p-2 rounded text-left text-xs font-mono border transition-all ${
                        isSelected 
                          ? "bg-accent-amber/10 border-accent-amber text-accent-amber shadow-[0_0_10px_rgba(245,158,11,0.05)]" 
                          : "bg-slate-900/60 border-primary-green/10 text-slate-300 hover:border-primary-green/30"
                      }`}
                    >
                      {CATEGORY_ICONS[skill.category]}
                      <span className="truncate">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Telemetry Details Display */}
            <div className="glass-panel rounded-lg p-6 border border-primary-green/25 flex-1 relative flex flex-col justify-between">
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex justify-between items-start border-b border-primary-green/15 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-primary-green uppercase tracking-wider block">
                      SECTOR // {selectedSkill.category}
                    </span>
                    <h3 className="text-xl font-bold text-white font-mono mt-0.5">
                      {selectedSkill.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950/80 border border-primary-green/20 font-mono text-xs text-primary-green">
                    <Sparkles size={12} className="text-accent-amber" />
                    <span>NIVEL: {selectedSkill.level}%</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    [ DESCRIPCIÓN_OPERATIVA ]
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed font-mono">
                    {SKILL_DESCRIPTIONS[selectedSkill.name] || "Configuración y desarrollo enfocado a altos requerimientos."}
                  </p>
                </div>
              </div>

              {/* Progress bar HUD */}
              <div className="mt-8 pt-4 border-t border-primary-green/15 space-y-3 font-mono">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>CAPACIDAD_DOMINIO</span>
                    <span className="text-accent-amber">{selectedSkill.level} / 100</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded border border-primary-green/20 overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent-amber"
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      key={selectedSkill.name}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Status log terminal mock */}
                <div className="bg-slate-950/70 p-2.5 rounded border border-primary-green/10 text-[10px] text-slate-400 space-y-1">
                  <div>STATUS: ONLINE_TELEMETRY</div>
                  <div>LAST_USE: ACCESO_RECIENTE_PROYECTOS</div>
                  <div className="text-primary-green flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-ping" />
                    <span>CARGA EFECTUADA SATISFACTORIAMENTE</span>
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
