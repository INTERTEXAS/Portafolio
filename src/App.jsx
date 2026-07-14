import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Database, FolderGit2, Menu, X, ArrowUp } from 'lucide-react';
import HeroSection from './components/HeroSection';
import TechRadar from './components/TechRadar';
import ProjectGrid from './components/ProjectGrid';
import ProjectDrawer from './components/ProjectDrawer';
import ContactFooter from './components/ContactFooter';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-bg-dark min-h-screen relative text-slate-100 flex flex-col justify-between selection:bg-accent-amber/30 selection:text-white">
      {/* HUD Scanner CRT overlay */}
      <div className="fixed inset-0 scanline opacity-[0.03] pointer-events-none z-55" />

      {/* HEADER / NAVIGATION BAR (Appears only after boot) */}
      <AnimatePresence>
        {booted && (
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 left-0 right-0 z-30 bg-bg-dark/85 backdrop-blur-md border-b border-primary-green/20"
          >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-xs">
              
              {/* Logo / Identifier */}
              <a href="#" className="flex items-center gap-2 text-primary-green font-bold group">
                <Terminal size={16} className="text-primary-green group-hover:text-accent-amber transition-colors" />
                <span className="tracking-wider">M_LAGUNES_DEV</span>
                <span className="text-accent-amber font-normal">[OS]</span>
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-8">
                <a 
                  href="#projects" 
                  className="text-slate-400 hover:text-primary-green transition-colors flex items-center gap-1.5"
                >
                  <FolderGit2 size={13} />
                  [01. CATALOGO_PROYECTOS]
                </a>
                <a 
                  href="#tech-radar" 
                  className="text-slate-400 hover:text-primary-green transition-colors flex items-center gap-1.5"
                >
                  <Cpu size={13} />
                  [02. TECH_RADAR]
                </a>
                <a 
                  href="#contact" 
                  className="text-slate-400 hover:text-primary-green transition-colors flex items-center gap-1.5"
                >
                  <Database size={13} />
                  [03. CONTACTO]
                </a>
              </nav>

              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded border border-primary-green/20 text-slate-300 hover:text-primary-green cursor-pointer"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden border-t border-primary-green/15 bg-bg-dark font-mono text-xs"
                >
                  <div className="p-6 flex flex-col gap-4">
                    <a 
                      href="#projects" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 border-b border-primary-green/5 text-slate-300 hover:text-primary-green flex items-center gap-2"
                    >
                      <FolderGit2 size={14} />
                      [01. CATALOGO_PROYECTOS]
                    </a>
                    <a 
                      href="#tech-radar" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 border-b border-primary-green/5 text-slate-300 hover:text-primary-green flex items-center gap-2"
                    >
                      <Cpu size={14} />
                      [02. TECH_RADAR]
                    </a>
                    <a 
                      href="#contact" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 border-b border-primary-green/5 text-slate-300 hover:text-primary-green flex items-center gap-2"
                    >
                      <Database size={14} />
                      [03. CONTACTO]
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <main className="flex-1">
        {/* HERO SECTION with boot sequence */}
        <HeroSection onBootComplete={() => setBooted(true)} />

        {/* CORE INTERFACE CONTENT (Revealed only after booting) */}
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Catalog Grid */}
            <ProjectGrid onProjectSelect={setSelectedProject} />

            {/* Tech Radar telemetry */}
            <TechRadar />
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      {booted && <ContactFooter />}

      {/* SLIDING DRAWER DETAIL VIEW */}
      <ProjectDrawer 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* FLOAT ACTION: BACK TO TOP */}
      <AnimatePresence>
        {booted && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 z-30 p-3 rounded border border-primary-green bg-slate-950/80 text-primary-green hover:bg-primary-green hover:text-slate-950 transition-all cursor-pointer glow-green flex items-center justify-center"
            title="Volver arriba"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
