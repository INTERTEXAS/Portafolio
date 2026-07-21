import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FolderGit2, Menu, X, ArrowUp, User, Database, Cpu } from 'lucide-react';
import HeroSection from './components/HeroSection';
import AboutMe from './components/AboutMe';
import ProjectGrid from './components/ProjectGrid';
import ProjectDrawer from './components/ProjectDrawer';
import TechRadar from './components/TechRadar';
import ContactFooter from './components/ContactFooter';

/* Global cursor follower component */
function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Hide on touch devices
  if ('ontouchstart' in window) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9998] mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(16,185,129,0.6) 0%, rgba(16,185,129,0) 70%)',
        boxShadow: '0 0 30px rgba(16,185,129,0.3)',
      }}
      animate={{
        x: pos.x - 10,
        y: pos.y - 10,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', mass: 0.1, stiffness: 800, damping: 30 }}
    />
  );
}

/* Animated navigation link */
function NavLink({ href, icon, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative text-slate-400 hover:text-primary-green transition-colors flex items-center gap-1.5 py-1 font-mono text-xs tracking-wide"
    >
      {icon}
      <span>{label}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary-green to-accent-amber group-hover:w-full transition-all duration-500" />
    </a>
  );
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-bg-dark min-h-screen relative text-slate-100 flex flex-col justify-between">
      {/* GLOBAL CURSOR FOLLOWER */}
      <CursorFollower />

      {/* FILM GRAIN CINEMATOGRAPHIC OVERLAY */}
      <div className="grain-overlay" />

      {/* ANIMATED GRADIENT MESH BACKGROUND */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* HEADER / NAVIGATION BAR */}
      <AnimatePresence>
        {booted && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ${
              scrolled
                ? 'bg-bg-dark/90 backdrop-blur-xl border-b border-primary-green/15 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                : 'bg-transparent border-b border-transparent'
            }`}
          >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2.5 group" onClick={handleScrollToTop}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-green to-teal-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all">
                  <Terminal size={14} className="text-slate-950" strokeWidth={3} />
                </div>
                <div className="font-heading">
                  <span className="text-white font-bold text-sm tracking-tight">M.LAGUNES</span>
                  <span className="text-accent-amber font-mono text-[10px] ml-1.5 opacity-60">v4.2</span>
                </div>
              </a>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                <NavLink href="#about" icon={<User size={13} />} label="PERFIL" />
                <NavLink href="#projects" icon={<FolderGit2 size={13} />} label="PROYECTOS" />
                <NavLink href="#tech-radar" icon={<Cpu size={13} />} label="STACK" />
                <NavLink href="#contact" icon={<Database size={13} />} label="CONTACTO" />
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg border border-primary-green/20 text-slate-300 hover:text-primary-green cursor-pointer transition-colors"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden border-t border-primary-green/10 bg-bg-dark/95 backdrop-blur-xl"
                >
                  <div className="p-6 flex flex-col gap-4 font-mono text-xs">
                    {[
                      { href: '#about', icon: <User size={15} />, label: 'PERFIL' },
                      { href: '#projects', icon: <FolderGit2 size={15} />, label: 'PROYECTOS' },
                      { href: '#tech-radar', icon: <Cpu size={15} />, label: 'STACK' },
                      { href: '#contact', icon: <Database size={15} />, label: 'CONTACTO' },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 border-b border-primary-green/8 text-slate-300 hover:text-primary-green flex items-center gap-3 transition-colors"
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative z-10">
        <HeroSection onBootComplete={() => setBooted(true)} />

        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AboutMe />
            <ProjectGrid onProjectSelect={setSelectedProject} />
            <TechRadar />
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      {booted && <ContactFooter />}

      {/* PROJECT DRAWER */}
      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* BACK TO TOP */}
      <AnimatePresence>
        {booted && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl border border-primary-green/30 bg-bg-dark/80 backdrop-blur-lg text-primary-green hover:bg-primary-green hover:text-slate-950 transition-all cursor-pointer glow-green shadow-lg"
            title="Volver arriba"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
