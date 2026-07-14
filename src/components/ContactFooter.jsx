import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, MessageSquare, Terminal, Send, Check } from 'lucide-react';
import { developerInfo } from '../data/data';

export default function ContactFooter() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate SMTP network call
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 4000);
    }, 1500);
  };

  return (
    <footer id="contact" className="relative border-t border-primary-green/20 bg-slate-950/40 py-16 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Telemetry & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-primary-green">
                <Terminal size={14} className="animate-pulse" />
                <span>[ TERMINAL_DE_ENLACE_DE_RED ]</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white font-mono">
                CONECTAR_CON_EL_SISTEMA
              </h2>
              <p className="text-slate-400 font-mono text-sm leading-relaxed">
                Establece un puente de comunicación para colaboraciones técnicas, 
                auditorías de requerimientos o despliegue de infraestructuras automatizadas.
              </p>
            </div>

            {/* Direct Email HUD Badge */}
            <div className="glass-panel p-4 rounded-lg border border-primary-green/20 bg-slate-900/40">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                CANAL_SMTP_DIRECTO
              </span>
              <a
                href={`mailto:${developerInfo.email}`}
                className="text-primary-green hover:text-accent-amber font-mono text-sm font-bold flex items-center gap-2 transition-colors break-all"
              >
                <Mail size={16} />
                {developerInfo.email}
              </a>
            </div>

            {/* Social Network Node Grids */}
            <div className="space-y-3 font-mono">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">
                PUNTOS_DE_ENLACE_EXTERNO (REDES)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={developerInfo.socials.github}
                  className="flex items-center gap-2.5 p-3 rounded border border-primary-green/10 bg-slate-900/20 text-slate-300 hover:border-accent-amber hover:text-accent-amber hover:shadow-[0_0_10px_rgba(245,158,11,0.05)] transition-all"
                >
                  <Github size={16} />
                  <span className="text-xs font-mono">GitHub</span>
                </a>
                <a
                  href={developerInfo.socials.linkedin}
                  className="flex items-center gap-2.5 p-3 rounded border border-primary-green/10 bg-slate-900/20 text-slate-300 hover:border-accent-amber hover:text-accent-amber hover:shadow-[0_0_10px_rgba(245,158,11,0.05)] transition-all"
                >
                  <Linkedin size={16} />
                  <span className="text-xs font-mono">LinkedIn</span>
                </a>
                <a
                  href={developerInfo.socials.twitter}
                  className="flex items-center gap-2.5 p-3 rounded border border-primary-green/10 bg-slate-900/20 text-slate-300 hover:border-accent-amber hover:text-accent-amber hover:shadow-[0_0_10px_rgba(245,158,11,0.05)] transition-all"
                >
                  <Twitter size={16} />
                  <span className="text-xs font-mono">X/Twitter</span>
                </a>
                <a
                  href={developerInfo.socials.discord}
                  className="flex items-center gap-2.5 p-3 rounded border border-primary-green/10 bg-slate-900/20 text-slate-300 hover:border-accent-amber hover:text-accent-amber hover:shadow-[0_0_10px_rgba(245,158,11,0.05)] transition-all"
                >
                  <MessageSquare size={16} />
                  <span className="text-xs font-mono">Discord</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-lg overflow-hidden border border-primary-green/30 shadow-2xl">
              {/* Window top bar */}
              <div className="bg-slate-900 px-4 py-2.5 border-b border-primary-green/20 flex justify-between items-center text-[10px] font-mono text-primary-green/80">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-green animate-ping" />
                  <span>smtp_client_session.bin</span>
                </div>
                <span>SECURE_ENVELOPE_V2</span>
              </div>

              {/* Form container */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 font-mono">
                {/* Row: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase">IDENTIFICADOR_SOLICITANTE (NOMBRE)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-950 border border-primary-green/20 rounded p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-accent-amber focus:shadow-[0_0_10px_rgba(245,158,11,0.1)] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase">PUERTO_RETORNO (CORREO)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., guest@net.com"
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-950 border border-primary-green/20 rounded p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-accent-amber focus:shadow-[0_0_10px_rgba(245,158,11,0.1)] transition-all"
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase">CARGA_DE_DATOS (MENSAJE)</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribe tu mensaje técnico..."
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-slate-950 border border-primary-green/20 rounded p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-accent-amber focus:shadow-[0_0_10px_rgba(245,158,11,0.1)] transition-all resize-none"
                  />
                </div>

                {/* Status indicator / Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Status terminal logs */}
                  <div className="text-[10px] text-slate-500 self-start sm:self-center">
                    {isSending && <span className="text-accent-amber animate-pulse">ESTABLECIENDO CONEXIÓN SMTP...</span>}
                    {isSent && <span className="text-primary-green flex items-center gap-1"><Check size={12} /> PAQUETE TRANSMITIDO CON ÉXITO</span>}
                    {!isSending && !isSent && <span>LISTO PARA TRANSMISIÓN</span>}
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSending || isSent}
                    className="w-full sm:w-auto px-6 py-2.5 rounded border border-accent-amber bg-accent-amber/10 hover:bg-accent-amber hover:text-slate-950 text-accent-amber text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-2 transition-all glow-amber cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'PROCESANDO...' : isSent ? 'TRANSMITIDO' : 'TRANSMITIR_MENSAJE'}
                    <Send size={12} className={isSending ? 'animate-bounce' : ''} />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Footer legal credits */}
        <div className="mt-16 pt-8 border-t border-primary-green/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {developerInfo.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4">
            <span>COMPILACIÓN: BUILD_SUCCESSFUL</span>
            <span>OS: M_LAGUNES_CONSOLE</span>
            <span>VERSIÓN: 2.1.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
