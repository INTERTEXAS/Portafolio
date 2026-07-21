import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import { aboutMe } from '../data/data';
import { useTextScramble } from '../hooks/useTextScramble';
import { useMagnetic } from '../hooks/useMagnetic';

const BOOT_LOGS = [
  `INIT: Booting ${aboutMe.name.toUpperCase().replace(/\s+/g, '_')}_SYSTEM v4.2...`,
  "CORE: React 19 + Tailwind CSS + Framer Motion [LOADED]",
  "ENGINE: Python v3.12 & PostgreSQL Cluster [CONNECTED]",
  `IDENTITY: ${aboutMe.role}`,
  "SECURITY: SSL Handshake complete. Launching interface..."
];

/* Staggered letter animation for the name */
function AnimatedName({ name }) {
  const [firstName, lastName] = name.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };

  const letterVariant = {
    hidden: { y: 60, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { type: 'spring', damping: 12, stiffness: 150 }
    }
  };

  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-heading leading-none">
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="inline-flex text-white"
      >
        {firstName.split('').map((char, i) => (
          <motion.span key={`f-${i}`} variants={letterVariant} className="inline-block">
            {char}
          </motion.span>
        ))}
      </motion.span>
      <br />
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="inline-flex"
      >
        {lastName.split('').map((char, i) => (
          <motion.span
            key={`l-${i}`}
            variants={letterVariant}
            className="inline-block text-shimmer"
            style={{ WebkitTextFillColor: 'transparent' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
}

/* Boot sequence line with scramble */
function BootLine({ text, delay }) {
  const [show, setShow] = useState(false);
  const { displayText } = useTextScramble(text, { speed: 20, scrambleDuration: 40, trigger: show });

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-2.5 items-start"
    >
      <span className="text-primary-green font-bold select-none">&gt;</span>
      <span className="text-slate-300">{displayText}</span>
    </motion.div>
  );
}

export default function HeroSection({ onBootComplete }) {
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);
  const magneticCTA1 = useMagnetic(0.25);
  const magneticCTA2 = useMagnetic(0.2);
  const { displayText: roleText } = useTextScramble(aboutMe.role, { speed: 25, trigger: !booting });

  // Boot sequence timer
  useEffect(() => {
    const totalDuration = BOOT_LOGS.length * 350 + 600;
    let progressInterval;

    progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, totalDuration / 50);

    const bootTimer = setTimeout(() => {
      setBooting(false);
      if (onBootComplete) onBootComplete();
    }, totalDuration);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(progressInterval);
    };
  }, [onBootComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[15%] w-[400px] h-[400px] bg-primary-green/8 rounded-full blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-[15%] w-[350px] h-[350px] bg-accent-amber/5 rounded-full blur-[120px] pointer-events-none animate-float-delayed" />
      <div className="absolute top-[60%] left-[50%] w-[250px] h-[250px] bg-teal-500/4 rounded-full blur-[100px] pointer-events-none animate-float" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

      <AnimatePresence mode="wait">
        {booting ? (
          /* TERMINAL BOOT SEQUENCE */
          <motion.div
            key="loader"
            initial={{ opacity: 1, scale: 0.96 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl mx-4 rounded-2xl overflow-hidden border border-primary-green/30 shadow-[0_0_60px_rgba(16,185,129,0.08)] relative bg-bg-dark/90 backdrop-blur-xl"
          >
            {/* Terminal Header */}
            <div className="bg-slate-950 px-5 py-3 border-b border-primary-green/20 flex justify-between items-center font-mono text-xs text-primary-green">
              <div className="flex items-center gap-2.5">
                <Terminal size={14} className="animate-pulse" />
                <span className="font-semibold tracking-wide">system_init.sh</span>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-xs h-64 overflow-y-auto no-scrollbar flex flex-col justify-end bg-slate-950/50 space-y-1.5">
              {BOOT_LOGS.map((log, index) => (
                <BootLine key={index} text={log} delay={index * 350} />
              ))}
              <div className="flex gap-2 mt-2 items-center">
                <span className="text-primary-green font-bold select-none">&gt;</span>
                <span className="w-2.5 h-4 bg-primary-green animate-blink inline-block rounded-sm" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="p-4 bg-slate-950/80 border-t border-primary-green/15">
              <div className="flex justify-between text-xs font-mono text-primary-green mb-2 font-semibold">
                <span>INICIALIZANDO PORTAFOLIO</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-primary-green/15">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-green via-teal-400 to-emerald-300 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* HERO MAIN PRESENTATION */
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl mx-auto px-6 relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-8">
                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary-green/25 bg-primary-green/8 font-mono text-xs text-primary-green"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                  <span className="font-semibold tracking-wider">SISTEMA EN LÍNEA</span>
                </motion.div>

                {/* Role (decoded with scramble) */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-mono text-sm text-primary-green/80 tracking-wider"
                >
                  [ {roleText} ]
                </motion.p>

                {/* Name with Staggered Letters */}
                <AnimatedName name={aboutMe.name} />

                {/* Goal Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="glass-panel p-5 rounded-xl border-l-[3px] border-l-accent-amber"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-accent-amber font-bold mb-2">
                    <Shield size={14} />
                    <span>OBJETIVO_PROFESIONAL</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed font-body">
                    {aboutMe.goal}
                  </p>
                </motion.div>

                {/* Magnetic CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <div
                    ref={magneticCTA1.ref}
                    onMouseMove={magneticCTA1.handleMouseMove}
                    onMouseLeave={magneticCTA1.handleMouseLeave}
                    style={magneticCTA1.magneticStyle}
                  >
                    <a
                      href="#projects"
                      className="px-7 py-4 rounded-xl border border-accent-amber bg-accent-amber/10 hover:bg-accent-amber hover:text-slate-950 font-bold text-accent-amber font-mono text-xs tracking-wider flex items-center gap-2.5 transition-all glow-amber duration-500 group cursor-pointer"
                    >
                      EXPLORAR_PROYECTOS
                      <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                    </a>
                  </div>
                  <div
                    ref={magneticCTA2.ref}
                    onMouseMove={magneticCTA2.handleMouseMove}
                    onMouseLeave={magneticCTA2.handleMouseLeave}
                    style={magneticCTA2.magneticStyle}
                  >
                    <a
                      href="#about"
                      className="px-7 py-4 rounded-xl border border-primary-green/30 bg-primary-green/5 hover:border-primary-green hover:bg-primary-green/10 font-bold text-primary-green font-mono text-xs tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                    >
                      SOBRE_MÍ
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: HUD Widget */}
              <div className="lg:col-span-5 flex justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 15 }}
                  className="w-full max-w-md glass-panel p-6 rounded-2xl relative overflow-hidden border border-primary-green/20 shadow-[0_0_60px_rgba(16,185,129,0.06)]"
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

                  {/* HUD Header */}
                  <div className="flex items-center justify-between border-b border-primary-green/15 pb-4 mb-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary-green font-semibold">
                      <Activity size={14} className="animate-pulse" />
                      <span>TELEMETRÍA_DE_SISTEMA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                      <span className="text-[10px] font-mono text-primary-green">LIVE</span>
                    </div>
                  </div>

                  {/* Animated Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: 'STACK_CORE', value: 'React + TW', color: 'text-primary-green' },
                      { label: 'PERSISTENCIA', value: 'PostgreSQL', color: 'text-primary-green' },
                      { label: 'LÓGICA', value: 'Python 3.12', color: 'text-primary-green' },
                      { label: 'ESTADO', value: 'Ready', color: 'text-accent-amber' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="bg-slate-950/60 border border-primary-green/15 p-3 rounded-lg font-mono"
                      >
                        <div className="text-[10px] text-slate-500">{stat.label}</div>
                        <div className={`text-xs font-bold mt-1 ${stat.color}`}>{stat.value}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pipeline Preview */}
                  <div className="bg-slate-950/80 border border-primary-green/15 p-4 rounded-lg font-mono text-[11px] space-y-2">
                    <div className="flex justify-between text-slate-400 border-b border-primary-green/10 pb-2 mb-2">
                      <span className="text-[10px] font-bold">PIPELINE_ACTIVO</span>
                      <span className="text-primary-green text-[10px]">[OK]</span>
                    </div>
                    {['UI → React 19', 'API → Python', 'DB → PostgreSQL'].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.15 }}
                        className="flex items-center justify-between text-slate-300"
                      >
                        <span className="text-slate-400">{line.split('→')[0]} →</span>
                        <span className="text-primary-green font-semibold">{line.split('→')[1]}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
