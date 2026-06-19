import { useState, useEffect, useRef } from 'react';
import { contenido } from '../data/contenido';
import { Tape, Asterisco, SubrayadoMarcador } from './deco/DecoElements';

export default function Contacto() {
  const { contacto } = contenido;
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Estados para validaciones y errores
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [shaking, setShaking] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);

  // Escuchar la tecla Escape para cerrar el formulario
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // Devolver foco al botón de apertura
        document.getElementById('toggle-form-btn')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: name.trim() === '',
      email: email.trim() === '' || !/\S+@\S+\.\S+/.test(email),
      message: message.trim() === ''
    };

    setErrors(newErrors);

    // Si hay errores, gatillar efecto shake
    if (newErrors.name || newErrors.email || newErrors.message) {
      setShaking({
        name: newErrors.name,
        email: newErrors.email,
        message: newErrors.message
      });

      // Remover clase shake después de la animación (400ms)
      setTimeout(() => {
        setShaking({ name: false, email: false, message: false });
      }, 400);
      return;
    }

    // Si no hay errores, procesar envío por mailto
    const mailtoUrl = `mailto:${contacto.email}?subject=Contacto de ${encodeURIComponent(name)}&body=${encodeURIComponent(
      `Hola Aikia,\n\n${message}\n\nAtentamente,\n${name}\nEmail: ${email}`
    )}`;
    
    window.location.href = mailtoUrl;
    
    // Activar estado de éxito
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    
    // Cerrar el formulario después de un rato
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contacto" className="py-20 px-4 md:px-6 max-w-[1060px] mx-auto relative fade-in-section">
      
      {/* Pink Banner Wrapper */}
      <div className="bg-[#FDA8A6] border-1.5 border-ink rounded-[24px] p-8 md:p-12 shadow-hard relative overflow-hidden">
        
        {/* Decorative Asterisks */}
        <Asterisco color="white" size={44} className="absolute top-[8%] left-[4%] opacity-90 select-none pointer-events-none" />
        <Asterisco color="blue" size={32} className="absolute bottom-[10%] right-[3%] opacity-90 select-none pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_auto_0.9fr] gap-8 md:gap-10 items-center relative z-10">
          
          {/* Left Column: Headline */}
          <div className="flex flex-col items-start">
            <h2 className="font-sans text-[32px] md:text-[44px] font-extrabold leading-[1.15] text-ink tracking-tight">
              Busco colaborar en <br className="hidden md:block" />
              productos <span className="relative inline-block mt-2">
                que importen.
                <SubrayadoMarcador color="blue" className="w-full absolute bottom-[-8px] left-0" />
              </span>
            </h2>
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden md:block w-[1.5px] h-[130px] bg-ink/15 self-center" />

          {/* Right Column: Social Links & Button */}
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-3.5 w-full">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/aikia-riveros-7b1630404/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-[14px] text-ink hover:underline font-bold group"
              >
                <div className="w-8 h-8 bg-blue border-[1.5px] border-ink flex items-center justify-center rounded-md flex-shrink-0 shadow-[2px_2px_0px_0px_#1A1A1A] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_0px_#1A1A1A] transition-all duration-100">
                  <svg className="w-4 h-4 fill-ink" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href="mailto:aikia.riv.c@gmail.com"
                className="flex items-center gap-3 font-mono text-[14px] text-ink hover:underline font-bold group"
              >
                <div className="w-8 h-8 bg-blue border-[1.5px] border-ink flex items-center justify-center rounded-md flex-shrink-0 shadow-[2px_2px_0px_0px_#1A1A1A] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_0px_#1A1A1A] transition-all duration-100">
                  <svg className="w-4.5 h-4.5 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span>aikia.riv.c@gmail.com</span>
              </a>

              {/* Behance */}
              <a
                href="https://www.behance.net/aikiariveros"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-[14px] text-ink hover:underline font-bold group"
              >
                <div className="w-8 h-8 bg-blue border-[1.5px] border-ink flex items-center justify-center rounded-md flex-shrink-0 shadow-[2px_2px_0px_0px_#1A1A1A] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[1px_1px_0px_0px_#1A1A1A] transition-all duration-100">
                  <svg className="w-4 h-4 fill-ink" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 10h-6v2h6v-2zm-12.72-2h-3.28v3h3.28c1.103 0 2-.897 2-2s-.897-2-2-2zm.28 6h-3.56v3.5h3.56c1.103 0 2-.897 2-2s-.897-1.5-2-1.5zm10.44-8c-2.762 0-5 2.239-5 5v3c0 2.761 2.238 5 5 5h1c2.762 0 5-2.239 5-5v-3c0-2.761-2.238-5-5-5zm-14.5 16h-7.5v-18h8c3.309 0 6 2.691 6 6 0 1.879-1.018 3.513-2.529 4.411 2.025.922 3.529 3.018 3.529 5.589 0 3.309-2.691 6-6 6zm14.5-8h-6v1c0 1.654 1.346 3 3 3s3-1.346 3-3zm-16-5h-3v3h3v-3zm0 6h-3v3h3v-3z"/>
                  </svg>
                </div>
                <span>Behance</span>
              </a>
            </div>

            {/* Form Toggle Button */}
            <button
              id="toggle-form-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="contacto-formulario"
              className="px-6 py-2.5 bg-white text-ink font-mono text-[11px] font-bold tracking-[0.1em] uppercase border-1.5 border-ink rounded-full shadow-hard transition-all duration-150 hover:bg-ink/5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-sm"
            >
              {isOpen ? 'Cerrar Formulario' : 'Escríbeme aquí'}
            </button>
          </div>

        </div>

        {/* Integrated Drop-down Form */}
        <div
          id="contacto-formulario"
          className={`grid transition-grid-rows ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}
        >
          <div className="overflow-hidden">
            <div ref={formRef} className="bg-white border-1.5 border-ink p-6 md:p-8 rounded-[12px] shadow-hard max-w-[600px] mx-auto mt-4 mb-4 relative text-ink">
              <Tape className="top-[-16px] left-[35%] z-20" color="yellow" />
              
              {submitted ? (
                <div className="text-center py-8">
                  <span className="text-[32px] block mb-2">📬</span>
                  <h3 className="font-serif italic text-[20px] text-pink font-bold mb-2">¡Mensaje listo para enviar!</h3>
                  <p className="text-[13px] text-ink-2 font-mono">
                    Se abrirá tu gestor de correo predeterminado para completar el envío. ¡Muchas gracias!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <h3 className="font-mono text-[11px] tracking-[0.15em] text-ink font-bold uppercase border-b-[1.5px] border-ink pb-2 mb-2 text-left">
                    Escríbeme
                  </h3>
                  
                  {/* Campo Nombre */}
                  <div className={`flex flex-col gap-1.5 text-left ${shaking.name ? 'animate-shake' : ''}`}>
                    <label htmlFor="form-name" className="font-mono text-[10px] text-ink-2 uppercase tracking-wider">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: false }));
                      }}
                      className={`border-1.5 p-3 rounded font-mono text-[12px] bg-paper/20 focus:outline-none focus:bg-paper/10 ${
                        errors.name ? 'border-pink focus:border-pink bg-pink-light/10 text-ink' : 'border-ink focus:border-blue'
                      }`}
                      placeholder="Tu nombre aquí"
                      required
                    />
                    {errors.name && (
                      <span className="font-mono text-[9px] text-pink">El nombre es requerido</span>
                    )}
                  </div>

                  {/* Campo Email */}
                  <div className={`flex flex-col gap-1.5 text-left ${shaking.email ? 'animate-shake' : ''}`}>
                    <label htmlFor="form-email" className="font-mono text-[10px] text-ink-2 uppercase tracking-wider">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: false }));
                      }}
                      className={`border-1.5 p-3 rounded font-mono text-[12px] bg-paper/20 focus:outline-none focus:bg-paper/10 ${
                        errors.email ? 'border-pink focus:border-pink bg-pink-light/10 text-ink' : 'border-ink focus:border-blue'
                      }`}
                      placeholder="ejemplo@correo.com"
                      required
                    />
                    {errors.email && (
                      <span className="font-mono text-[9px] text-pink">Ingresa un correo válido</span>
                    )}
                  </div>

                  {/* Campo Mensaje */}
                  <div className={`flex flex-col gap-1.5 text-left ${shaking.message ? 'animate-shake' : ''}`}>
                    <label htmlFor="form-message" className="font-mono text-[10px] text-ink-2 uppercase tracking-wider">
                      Mensaje
                    </label>
                    <textarea
                      id="form-message"
                      rows="4"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: false }));
                      }}
                      className={`border-1.5 p-3 rounded font-mono text-[12px] bg-paper/20 focus:outline-none focus:bg-paper/10 resize-none ${
                        errors.message ? 'border-pink focus:border-pink bg-pink-light/10 text-ink' : 'border-ink focus:border-blue'
                      }`}
                      placeholder="Hola Aikia, me gustaría colaborar contigo en..."
                      required
                    />
                    {errors.message && (
                      <span className="font-mono text-[9px] text-pink">El mensaje no puede estar vacío</span>
                    )}
                  </div>

                  {/* Botón Enviar */}
                  <button
                    type="submit"
                    className="mt-2 py-3 bg-ink text-paper font-mono text-[11px] tracking-[0.1em] uppercase shadow-hard-pink border-1.5 border-ink transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#FF9899] hover:shadow-[5px_5px_0px_0px_#FF9899]"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
