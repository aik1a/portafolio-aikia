import { useState, useEffect } from 'react';
import { Asterisco, SubrayadoMarcador } from './deco/DecoElements';

export default function Header() {
  const [activeHash, setActiveHash] = useState(() => window.location.hash || '#sobre-mi');

  const navLinks = [
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Formación', href: '#formacion' },
    { label: 'Contacto', href: '#contacto' }
  ];

  // Actualizar el link activo según el hash actual o el scroll
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-5 bg-paper/90 backdrop-blur-sm border-b border-ink/10">
      {/* Izquierda: Nombre en negrita con subrayado fino */}
      <a href="#" className="relative group block">
        <span className="font-bold text-[15px] tracking-tight text-ink">
          Aikia Riveros
        </span>
        {/* Subrayado fino hecho a mano con una línea SVG */}
        <svg
          className="absolute -bottom-1 left-0 w-full h-[3px] text-ink/40"
          viewBox="0 0 100 3"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0,1.5 Q 50,0.5 100,1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </a>

      {/* Derecha: 5 links en Space Mono y asterisco azul al final */}
      <div className="flex items-center gap-7">
        <ul className="flex items-center gap-7 list-none">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={() => setActiveHash(link.href)}
                  className="font-mono text-[11px] text-ink-2 hover:text-pink transition-colors duration-150 relative pb-1 block"
                >
                  {link.label}
                </a>
                
                {/* Underline rosado tipo marcador para el link activo */}
                {isActive && (
                  <SubrayadoMarcador
                    color="pink"
                    className="absolute -bottom-2.5 left-0 w-full h-[6px] pointer-events-none"
                  />
                )}
              </li>
            );
          })}
        </ul>
        
        {/* Asterisco azul pequeño al final de la fila */}
        <Asterisco color="blue" size={13} className="ml-2 animate-[pulse_2s_infinite]" />
      </div>
    </nav>
  );
}
