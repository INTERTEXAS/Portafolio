import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MessageSquare, Terminal, Send, Check, ExternalLink } from 'lucide-react';
import { aboutMe } from '../data/data';

export default function ContactFooter() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: aboutMe.web3formsKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          from_name: "Portafolio Miguel Lagunes"
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsSent(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        console.warn("Web3Forms API response:", data);
        setErrorMessage(data.message || "Error al procesar el envío.");
      }
    } catch (error) {
      console.error("Error al enviar mensaje vía Web3Forms:", error);
      setErrorMessage("Error de conexión con el servidor.");
    } finally {
      setIsSending(false);
      setTimeout(() => {
        setIsSent(false);
        setErrorMessage('');
      }, 6000);
    }
  };

  const socialLinks = [
    { name: "GitHub", icon: <Github size={18} />, url: aboutMe.socials.github, handle: "github.com" },
    { name: "LinkedIn", icon: <Linkedin size={18} />, url: aboutMe.socials.linkedin, handle: "linkedin.com" },
    { name: "X/Twitter", icon: <Twitter size={18} />, url: aboutMe.socials.twitter, handle: "x.com" },
    { name: "Discord", icon: <MessageSquare size={18} />, url: aboutMe.socials.discord, handle: "discord.com" }
  ];

  const inputClasses = (field) => `
    w-full bg-slate-950/80 border rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600
    font-mono focus:outline-none transition-all duration-500
    ${focusedField === field
      ? 'border-accent-amber shadow-[0_0_20px_rgba(245,158,11,0.12)]'
      : 'border-primary-green/20 hover:border-primary-green/40'
    }
  `;

  return (
    <footer id="contact" className="relative border-t border-primary-green/15 bg-slate-950/60 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-green/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-primary-green">
                <Terminal size={14} className="animate-pulse" />
                <span>[ CANAL_DE_CONTACTO ]</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-heading">
                Conectar
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-body">
                Disponible para equipos de desarrollo Full-Stack, proyectos Frontend en React y arquitecturas de datos.
              </p>
            </div>

            {/* Email Badge */}
            <div className="glass-panel p-5 rounded-2xl border border-primary-green/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                CORREO_DIRECTO
              </span>
              <a
                href={`mailto:${aboutMe.email}`}
                className="text-primary-green hover:text-accent-amber font-mono text-base font-bold flex items-center gap-2.5 transition-colors break-all group"
              >
                <Mail size={18} className="text-accent-amber group-hover:scale-110 transition-transform" />
                {aboutMe.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold font-mono">
                ENLACES_PROFESIONALES
              </span>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 p-3.5 rounded-xl border border-primary-green/15 bg-slate-950/40 text-slate-300 hover:border-accent-amber hover:text-accent-amber transition-all duration-400"
                  >
                    <span className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <div>
                      <div className="text-xs font-bold font-mono">{social.name}</div>
                      <div className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-2xl overflow-hidden border border-primary-green/20 shadow-[0_0_60px_rgba(0,0,0,0.3)]">
              {/* Window Header */}
              <div className="bg-slate-950 px-5 py-3 border-b border-primary-green/15 flex justify-between items-center font-mono text-xs text-primary-green font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                  <span>mensaje_directo.sh</span>
                </div>
                <span className="text-slate-500 text-[11px]">SECURE</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 font-mono">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">NOMBRE</label>
                    <input
                      type="text"
                      required
                      placeholder="Tu nombre..."
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={inputClasses('name')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-400 uppercase font-bold">CORREO</label>
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={inputClasses('email')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase font-bold">MENSAJE</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntame sobre tu proyecto o propuesta..."
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClasses('message')} resize-none`}
                  />
                </div>

                {/* Status & Submit */}
                <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px]">
                    {isSending && <span className="text-accent-amber animate-pulse font-bold">TRANSMITIENDO...</span>}
                    {isSent && <span className="text-primary-green font-bold flex items-center gap-1.5"><Check size={14} /> ENVIADO CON ÉXITO</span>}
                    {errorMessage && <span className="text-red-400 font-bold">{errorMessage}</span>}
                    {!isSending && !isSent && !errorMessage && <span className="text-slate-500 font-mono">ESTADO: LISTO</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSending || isSent}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-accent-amber bg-accent-amber/10 hover:bg-accent-amber hover:text-slate-950 text-accent-amber text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-2.5 transition-all duration-500 glow-amber cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'PROCESANDO...' : isSent ? 'ENVIADO' : 'ENVIAR_MENSAJE'}
                    <Send size={14} className={isSending ? 'animate-bounce' : ''} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-primary-green/10 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <span className="text-primary-green font-semibold">{aboutMe.name}</span>
          </div>
          <div className="flex gap-5 text-[11px]">
            <span>REACT + TAILWIND + FRAMER MOTION</span>
            <span className="text-accent-amber">v4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
