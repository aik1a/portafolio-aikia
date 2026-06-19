import React from 'react';

// 1. Asterisco (de 6 brazos, trazo grueso redondeado)
export const Asterisco = ({ color = 'pink', className = '', size = 24 }) => {
  const colors = {
    pink: 'text-pink',
    blue: 'text-blue',
    yellow: 'text-yellow',
    ink: 'text-ink',
    white: 'text-white',
  };
  const colorClass = colors[color] || colors.pink;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className={`${colorClass} ${className}`}
      aria-hidden="true"
    >
      <path d="M 12,3 L 12,21" />
      <path d="M 4.2,7.5 L 19.8,16.5" />
      <path d="M 4.2,16.5 L 19.8,7.5" />
    </svg>
  );
};

// 2. Tape (cinta adhesiva beige semitransparente con rotación y bordes rotos)
export const Tape = ({ className = '', color = 'beige', size = 110 }) => {
  const colors = {
    beige: 'fill-[#F4F0DB]/70 stroke-[#E9E3C5]/80',
    yellow: 'fill-yellow/40 stroke-yellow/50',
    pink: 'fill-pink-light/50 stroke-pink/50',
    blue: 'fill-blue/30 stroke-blue/40',
    white: 'fill-white/60 stroke-white/70',
  };
  const colorClass = colors[color] || colors.beige;

  return (
    <div 
      className={`inline-block select-none pointer-events-none ${className}`} 
      aria-hidden="true" 
      style={{ width: size }}
    >
      <svg
        viewBox="0 0 110 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform rotate-[2deg] w-full"
      >
        <path
          d="M 4,7 
             L 16,5 L 28,8 L 48,5 L 72,8 L 94,5 L 106,8
             L 105,14 L 107,18 L 104,24 L 106,27
             L 94,26 L 78,28 L 56,25 L 38,27 L 22,24 L 6,26
             L 4,21 L 5,16 L 3,11 Z"
          className={colorClass}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

// 3. Halftone (patrón de puntos de fondo con pattern SVG)
export const Halftone = ({ className = '', color = 'blue', width = 120, height = 120 }) => {
  const colors = {
    blue: 'text-blue',
    yellow: 'text-yellow',
    pink: 'text-pink',
    ink: 'text-ink',
  };
  const colorClass = colors[color] || colors.blue;
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`select-none pointer-events-none opacity-25 ${colorClass} ${className}`} aria-hidden="true">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <pattern id={`halftone-${uniqueId}`} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="2.0" fill="currentColor" />
            <circle cx="2" cy="8" r="0.8" fill="currentColor" />
            <circle cx="8" cy="2" r="0.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#halftone-${uniqueId})`} />
      </svg>
    </div>
  );
};

// 4. SubrayadoMarcador (trazo horizontal ondulado e imperfecto para títulos)
export const SubrayadoMarcador = ({ className = '', color = 'yellow', height = 10 }) => {
  const colors = {
    yellow: 'text-yellow',
    pink: 'text-pink',
    'pink-light': 'text-pink-light',
    blue: 'text-blue',
    ink: 'text-ink',
  };
  const colorClass = colors[color] || colors.yellow;

  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      fill="none"
      className={`block pointer-events-none ${colorClass} ${className}`}
      aria-hidden="true"
    >
      {/* Trazo grueso semi-solapado de plumón */}
      <path
        d="M 2,5 Q 25,2 50,6 T 98,5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M 5,6 Q 35,3 65,7 T 95,5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
};

// 5. OvaloSketch (óvalo dibujado a mano alzada para rodear texto)
export const OvaloSketch = ({ children, className = '', color = 'pink', padding = 'px-3 py-1' }) => {
  const colors = {
    pink: 'text-pink',
    blue: 'text-blue',
    yellow: 'text-yellow',
    ink: 'text-ink',
  };
  const colorClass = colors[color] || colors.pink;

  return (
    <span className={`relative inline-block z-10 ${className}`}>
      <span className={`relative z-10 ${padding}`}>{children}</span>
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${colorClass}`}
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* Trazo que se solapa y no se cierra de forma perfecta */}
        <path d="M 5,20 C 5,5 95,2 95,18 C 95,35 15,38 7,22" />
        <path d="M 12,25 C 25,36 85,34 92,20 C 95,8 50,6 18,12" opacity="0.4" />
      </svg>
    </span>
  );
};

// 6. FlechaDoodle (flecha curva de trazo irregular)
export const FlechaDoodle = ({ className = '', color = 'blue', rotate = 0, size = 40 }) => {
  const colors = {
    pink: 'text-pink',
    blue: 'text-blue',
    yellow: 'text-yellow',
    ink: 'text-ink',
  };
  const colorClass = colors[color] || colors.blue;

  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 40 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${colorClass} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path d="M 4,15 C 14,8 26,10 35,16" />
      <path d="M 28,9 L 36,16 L 27,22" />
      <path d="M 6,18 C 16,13 25,15 32,18" opacity="0.5" />
    </svg>
  );
};

// 7. SelloCircular (con texto curvo, rosado por defecto y rotado)
export const SelloCircular = ({ text = "DISEÑO • CURIOSIDAD • BORDE • GRACIA •", className = '', color = 'pink', size = 100, rotate = 12 }) => {
  const colors = {
    pink: 'text-pink',
    blue: 'text-blue',
    yellow: 'text-yellow',
    ink: 'text-ink',
  };
  const colorClass = colors[color] || colors.pink;
  const uniqueId = `sello-path-${text.replace(/[^a-zA-Z]/g, '-').toLowerCase()}`;

  return (
    <div 
      className={`relative select-none pointer-events-none ${colorClass} ${className}`} 
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }} 
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <path
            id={uniqueId}
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M47,50 L53,50 M50,47 L50,53 M48,48 L52,52 M48,52 L52,48" stroke="currentColor" strokeWidth="1.5" />
        <text className="font-mono text-[7.5px] font-bold fill-current">
          <textPath href={`#${uniqueId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

// 8. SelloStamp (óvalo de borde doble con texto "EN CONSTRUCCIÓN", rosado, rotado -8 grados)
export const SelloStamp = ({ className = '', color = 'pink', text = "EN CONSTRUCCIÓN", rotate = -8, width = 140, height = 65 }) => {
  const colors = {
    pink: 'text-pink',
    blue: 'text-blue',
    yellow: 'text-yellow',
    ink: 'text-ink',
  };
  const colorClass = colors[color] || colors.pink;

  return (
    <div 
      className={`inline-block select-none pointer-events-none ${colorClass} ${className}`} 
      style={{ transform: `rotate(${rotate}deg)`, width, height }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 140 65" className="fill-none stroke-current">
        {/* Borde doble irregular tipo timbre */}
        <path d="M 8,32.5 C 8,10 40,8 70,8 C 100,8 132,10 132,32.5 C 132,55 100,57 70,57 C 40,57 8,55 8,32.5 Z" strokeWidth="2" />
        <path d="M 12,32.5 C 12,13 40,11 70,11 C 100,11 128,13 128,32.5 C 128,52 100,54 70,54 C 40,54 12,52 12,32.5 Z" strokeWidth="1.2" strokeDasharray="4 2" />
        
        {/* Texto central */}
        <text 
          x="70" 
          y="38" 
          textAnchor="middle" 
          className="font-mono text-[10px] font-bold stroke-none fill-current tracking-widest"
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

// 9. GrillaSketch (grilla de líneas finas para fondos)
export const GrillaSketch = ({ className = '', color = 'ink', width = 120, height = 120 }) => {
  const colors = {
    ink: 'text-ink',
    pink: 'text-pink',
    blue: 'text-blue',
    yellow: 'text-yellow',
  };
  const colorClass = colors[color] || colors.ink;
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`select-none pointer-events-none opacity-15 ${colorClass} ${className}`} aria-hidden="true">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <pattern id={`grid-${uniqueId}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0,2 C 7,2.2 14,1.8 20,2" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <path d="M 2,0 C 1.8,7 2.2,14 2,20" stroke="currentColor" strokeWidth="0.8" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${uniqueId})`} />
      </svg>
    </div>
  );
};

// 10. TarjetaRiso (wrapper blanco, borde 1.5px ink, esquinas 12px, sombra dura)
export const TarjetaRiso = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div
      className={`bg-white border-1.5 border-ink rounded-[12px] p-6 shadow-hard transition-all duration-155 ease-out relative overflow-hidden
        ${hoverEffect ? 'hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
