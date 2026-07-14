import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Database, ChevronRight, Activity, Server, ArrowRight } from 'lucide-react';

const BOOT_LOGS = [
  "INIT_SEQUENCE: Booting M_LAGUNES_OS v4.2.1...",
  "SYSTEM_CHECK: Core temperature 42°C - Status: OPTIMAL",
  "NETWORK: Stabilizing connection to local loopback...",
  "DATABASE: Connecting to PostgreSQL cluster at 127.0.0.1:5432...",
  "DATABASE: Connections established. Active connections pool: [8/10]",
  "ENGINEERING_STACK: Mounting React 19 Client Environment...",
  "AUTOMATION_ENGINE: Starting asyncio worker pools (Python v3.12)...",
  "COMPILING: Building AST and asset bundles...",
  "SYSTEM_CHECK: Memory usage: 1.2GB/16.0GB - GC running",
  "DEVICES: Portafolio components mounted successfully.",
  "SECURITY: SSL handshake complete. User role: ANONYMOUS_GUEST",
  "OS: Boot completed. Launching Dashboard UI..."
];

export default function HeroSection({ onBootComplete }) {
  const [booting, setBooting] = useState(true);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  // Boot sequence logic
  useEffect(() => {
    if (currentLogIndex < BOOT_LOGS.length) {
      const delay = Math.random() * 250 + 100; // random delay for realism
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[currentLogIndex]]);
        setCurrentLogIndex(prev => prev + 1);
        setProgress(Math.round(((currentLogIndex + 1) / BOOT_LOGS.length) * 100));
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const delay = setTimeout(() => {
        setBooting(false);
        if (onBootComplete) onBootComplete();
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [currentLogIndex]);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background grid + ambient glow */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary-green/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-accent-amber/5 rounded-full blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {booting ? (
          /* BOOT LOADER */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-4 glass-panel rounded-lg overflow-hidden border border-primary-green/30 shadow-2xl relative"
          >
            {/* Window bar */}
            <div className="bg-slate-900/90 px-4 py-2 border-b border-primary-green/20 flex justify-between items-center text-xs font-mono text-primary-green/80">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="animate-pulse" />
                <span>m_lagunes_boot_manager.sh</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            {/* Terminal logs */}
            <div className="p-5 font-mono text-xs text-slate-300 h-64 overflow-y-auto no-scrollbar flex flex-col justify-end bg-slate-950/40">
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex gap-2"
                  >
                    <span className="text-primary-green/60 font-bold select-none">&gt;</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-primary-green/60 font-bold select-none">&gt;</span>
                <span className="w-2 h-4 bg-primary-green animate-blink" />
              </div>
            </div>

            {/* Loading progress bar */}
            <div className="p-4 bg-slate-950/80 border-t border-primary-green/20">
              <div className="flex justify-between items-center text-xs font-mono text-primary-green mb-1">
                <span>INICIALIZANDO PORTAFOLIO</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded overflow-hidden border border-primary-green/20">
                <motion.div
                  className="h-full bg-primary-green"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ACTUAL HERO CONTENT */
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Column Left: Introduction */}
            <div className="lg:col-span-7 space-y-6">
              {/* Security/Access tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-green/30 bg-primary-green/5 text-primary-green text-xs font-mono">
                <Shield size={12} className="text-primary-green animate-pulse" />
                <span>ACCESO AUTORIZADO // M_LAGUNES_DEV</span>
              </div>

              {/* Title & Name */}
              <div className="space-y-2">
                <h2 className="text-slate-400 font-mono text-sm tracking-wider uppercase">
                  [ Ingeniero de Software & Automatizador ]
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                  Miguel <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-teal-400">Lagunes</span>
                </h1>
              </div>

              {/* Bio description */}
              <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                Especialista en la construcción de sistemas corporativos escalables,
                automatización inteligente de infraestructura y diseño de bases de datos
                relacionales óptimas. Construyo software que soluciona desafíos empresariales reales.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded border border-accent-amber bg-accent-amber/10 hover:bg-accent-amber hover:text-slate-950 font-bold text-accent-amber font-mono text-sm tracking-wider flex items-center gap-2 transition-all glow-amber duration-300 group"
                >
                  EJECUTAR_CATALOGO
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded border border-primary-green bg-transparent hover:bg-primary-green/10 font-bold text-primary-green font-mono text-sm tracking-wider flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  ESTABLECER_CONTACTO
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>

            {/* Column Right: HUD Widget Interactive Node */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
                className="w-full max-w-md glass-panel p-6 rounded-lg relative overflow-hidden shadow-2xl border border-primary-green/20"
              >
                {/* Visual grid in card */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

                {/* Header of HUD */}
                <div className="flex items-center justify-between border-b border-primary-green/20 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary-green">
                    <Activity size={14} className="text-primary-green animate-pulse" />
                    <span>ESTADO_NUCLEO_PRINCIPAL</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-green animate-ping" />
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-950/50 border border-primary-green/10 p-3 rounded font-mono">
                    <div className="text-[10px] text-slate-500">CONEXIONES_DB</div>
                    <div className="text-sm font-semibold text-primary-green flex items-center gap-1.5 mt-1">
                      <Database size={14} />
                      <span>PostgreSQL [OK]</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 border border-primary-green/10 p-3 rounded font-mono">
                    <div className="text-[10px] text-slate-500">LÓGICA_NEGOCIO</div>
                    <div className="text-sm font-semibold text-primary-green flex items-center gap-1.5 mt-1">
                      <Cpu size={14} />
                      <span>Python v3.12</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 border border-primary-green/10 p-3 rounded font-mono">
                    <div className="text-[10px] text-slate-500">INTERFAZ_VIRTUAL</div>
                    <div className="text-sm font-semibold text-primary-green flex items-center gap-1.5 mt-1">
                      <Server size={14} />
                      <span>React + Tailwind</span>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 border border-primary-green/10 p-3 rounded font-mono">
                    <div className="text-[10px] text-slate-500">EFICIENCIA_LATENCIA</div>
                    <div className="text-sm font-semibold text-primary-green flex items-center gap-1.5 mt-1">
                      <Activity size={14} className="text-accent-amber" />
                      <span className="text-accent-amber">99.8% OPTIMAL</span>
                    </div>
                  </div>
                </div>

                {/* Subsystem graph mock */}
                <div className="bg-slate-950/80 border border-primary-green/20 p-4 rounded font-mono text-[11px] space-y-2 relative overflow-hidden">
                  <div className="flex justify-between text-slate-400">
                    <span>MÓDULOS_CARGADOS</span>
                    <span className="text-accent-amber">[SISTEMA OPERATIVO]</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between items-center">
                      <span>• async_discord_bot.py</span>
                      <span className="text-primary-green font-bold">[ONLINE]</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>• react_cuadrapro_client</span>
                      <span className="text-primary-green font-bold">[ONLINE]</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>• turnos_medico_crud_db</span>
                      <span className="text-primary-green font-bold">[ONLINE]</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
