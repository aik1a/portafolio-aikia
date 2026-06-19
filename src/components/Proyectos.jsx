import React from 'react';
import { contenido } from '../data/contenido';
import { TarjetaRiso, SubrayadoMarcador, FlechaDoodle, Asterisco } from './deco/DecoElements';

// --- ILUSTRACIONES DIBUJADAS A MANO (SVGs inline) ---

// SagaFlow: lista de tareas con checkboxes + mini gráfico de línea
const SagaFlowIllustration = () => (
  <svg
    viewBox="0 0 240 120"
    className="w-full h-[120px] text-ink stroke-current fill-none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Fondo del mini panel */}
    <rect x="5" y="5" width="230" height="110" rx="10" strokeDasharray="3 3" opacity="0.4" />

    {/* Lista de tareas */}
    <g transform="translate(15, 15)">
      {/* Tarea 1 (Completa) */}
      <rect x="0" y="5" width="14" height="14" rx="3" className="stroke-ink" />
      <path d="M 3,12 L 7,16 L 12,8" className="stroke-pink" strokeWidth="2.5" />
      <line x1="24" y1="12" x2="110" y2="12" className="stroke-ink opacity-40" strokeWidth="1.5" />

      {/* Tarea 2 (Incompleta) */}
      <rect x="0" y="27" width="14" height="14" rx="3" className="stroke-ink" />
      <line x1="24" y1="34" x2="95" y2="34" className="stroke-ink" strokeWidth="1.5" />

      {/* Tarea 3 (Completa) */}
      <rect x="0" y="49" width="14" height="14" rx="3" className="stroke-ink" />
      <path d="M 3,56 L 7,60 L 12,52" className="stroke-pink" strokeWidth="2.5" />
      <line x1="24" y1="56" x2="105" y2="56" className="stroke-ink opacity-40" strokeWidth="1.5" />
    </g>

    {/* Mini gráfico de línea (esquina derecha) */}
    <g transform="translate(140, 25)">
      {/* Grilla sutil */}
      <path d="M 0,0 L 0,60 L 70,60" className="stroke-ink" strokeWidth="1.5" />
      <path d="M 0,20 L 70,20 M 0,40 L 70,40" strokeDasharray="2 3" className="stroke-ink/20" strokeWidth="1" />
      
      {/* Línea del gráfico */}
      <path
        d="M 5,50 Q 20,25 35,42 T 65,10"
        className="stroke-blue"
        strokeWidth="3"
        fill="none"
      />
      {/* Punto destacado final */}
      <circle cx="65" cy="10" r="4.5" className="fill-pink stroke-ink" strokeWidth="1.5" />
    </g>
  </svg>
);

// Llekén: maceta con planta + anillo de progreso con "72%"
const LlekenIllustration = () => (
  <svg
    viewBox="0 0 240 120"
    className="w-full h-[120px] text-ink stroke-current fill-none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Fondo del panel */}
    <rect x="5" y="5" width="230" height="110" rx="10" strokeDasharray="3 3" opacity="0.4" />

    {/* Planta en maceta */}
    <g transform="translate(30, 25)">
      {/* Maceta */}
      <path d="M 12,45 L 38,45 L 44,72 L 6,72 Z" className="fill-paper stroke-ink" />
      <line x1="3" y1="45" x2="47" y2="45" strokeWidth="2.5" />
      
      {/* Planta / Hojas */}
      <path d="M 25,45 Q 25,10 12,2" className="stroke-blue" strokeWidth="2.5" />
      <path d="M 25,45 Q 35,15 45,5" className="stroke-blue" strokeWidth="2.5" />
      {/* Hojas individuales */}
      <path d="M 12,2 C 5,10 10,25 20,30" className="fill-blue/10 stroke-blue" />
      <path d="M 45,5 C 50,15 40,30 30,35" className="fill-blue/10 stroke-blue" />
      <path d="M 22,25 Q 35,5 38,0" className="stroke-blue/70" strokeWidth="1.5" />
    </g>

    {/* Anillo de progreso */}
    <g transform="translate(150, 60)">
      {/* Círculo fondo */}
      <circle cx="0" cy="0" r="30" className="stroke-ink/10" strokeWidth="4" />
      {/* Círculo progreso (72%) */}
      <path
        d="M 0,-30 A 30,30 0 1,1 -20,22"
        className="stroke-blue"
        strokeWidth="4.5"
        strokeDasharray="2"
      />
      {/* Texto central */}
      <text
        x="0"
        y="4"
        textAnchor="middle"
        className="font-mono text-[13px] font-bold fill-ink stroke-none"
      >
        72%
      </text>
      {/* Sello de validado local */}
      <path d="M 33,-25 Q 40,-15 43,-3" className="stroke-pink" strokeWidth="1.5" />
      <path d="M 39,-8 L 43,-3 L 47,-12" className="stroke-pink" strokeWidth="1.5" />
    </g>
  </svg>
);

// Kellun: burbujas de chat + gráfico de torta con sector amarillo
const KellunIllustration = () => (
  <svg
    viewBox="0 0 240 120"
    className="w-full h-[120px] text-ink stroke-current fill-none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Fondo del panel */}
    <rect x="5" y="5" width="230" height="110" rx="10" strokeDasharray="3 3" opacity="0.4" />

    {/* Burbujas de chat */}
    <g transform="translate(15, 20)">
      {/* Burbuja 1 */}
      <path
        d="M 10,10 C 10,2 60,2 60,10 C 60,18 45,18 35,18 L 25,24 L 28,18 C 10,18 10,18 10,10 Z"
        className="fill-paper stroke-ink"
      />
      <line x1="20" y1="10" x2="45" y2="10" className="stroke-ink opacity-60" strokeWidth="1.5" />

      {/* Burbuja 2 */}
      <path
        d="M 85,30 C 85,22 135,22 135,30 C 135,38 120,38 110,38 L 105,44 L 107,38 C 85,38 85,38 85,30 Z"
        className="fill-blue/15 stroke-blue"
      />
      <line x1="95" y1="30" x2="120" y2="30" className="stroke-blue opacity-80" strokeWidth="1.5" />
    </g>

    {/* Gráfico de torta (Pie chart) */}
    <g transform="translate(175, 60)">
      {/* Círculo completo */}
      <circle cx="0" cy="0" r="32" className="stroke-ink" strokeWidth="2" />
      
      {/* Líneas divisorias */}
      <line x1="0" y1="0" x2="0" y2="-32" className="stroke-ink" />
      <line x1="0" y1="0" x2="27" y2="16" className="stroke-ink" />
      <line x1="0" y1="0" x2="-22" y2="23" className="stroke-ink" />
      
      {/* Sector amarillo destacado (reemplazo de encuestas) */}
      <path
        d="M 0,0 L 0,-32 A 32,32 0 0,1 27.7,16 Z"
        className="fill-yellow stroke-ink"
        strokeWidth="2"
      />
      
      {/* Anotación "IA" */}
      <text
        x="22"
        y="-18"
        className="font-mono text-[8px] font-bold fill-pink stroke-none"
      >
        IA
      </text>
    </g>
  </svg>
);

export default function Proyectos() {
  const { proyectos } = contenido;

  const renderIllustration = (id) => {
    switch (id) {
      case 'sagaflow':
        return <SagaFlowIllustration />;
      case 'lleken':
        return <LlekenIllustration />;
      case 'kellun':
        return <KellunIllustration />;
      default:
        return null;
    }
  };

  const getDecisionStyles = (id) => {
    switch (id) {
      case 'sagaflow':
        return {
          bg: 'bg-pink-light',
          shadow: 'shadow-hard-pink',
          border: 'border-ink'
        };
      case 'lleken':
        return {
          bg: 'bg-blue-lleken',
          shadow: 'shadow-hard-blue',
          border: 'border-ink'
        };
      case 'kellun':
        return {
          bg: 'bg-yellow-kellun',
          shadow: 'shadow-hard-yellow',
          border: 'border-ink'
        };
      default:
        return {
          bg: 'bg-white',
          shadow: 'shadow-hard',
          border: 'border-ink'
        };
    }
  };

  return (
    <section id="proyectos" className="py-20 px-6 md:px-10 max-w-[1060px] mx-auto relative fade-in-section">
      
      {/* Title Area with Arrow */}
      <div className="flex flex-col items-start relative mb-12">
        <div className="flex flex-wrap items-center gap-4 relative mb-4">
          <div className="relative inline-block">
            <h2 className="font-sans text-[36px] md:text-[48px] font-extrabold leading-none tracking-tight text-ink">
              <span className="relative inline-block">
                Proyectos
                <SubrayadoMarcador color="pink" className="w-full absolute -bottom-3 left-0 h-[6px]" />
              </span>
            </h2>
          </div>
        </div>
        
        {/* Blue doodle arrow pointing down-right towards cards */}
        <FlechaDoodle color="blue" rotate={35} className="absolute left-[180px] md:left-[220px] top-[40px] md:top-[45px] w-12 h-9 hidden sm:block" />
      </div>

      {/* 3-column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {proyectos.items.map((proj) => {
          const decStyles = getDecisionStyles(proj.id);
          const asterColor = proj.id === 'sagaflow' ? 'pink' : proj.id === 'lleken' ? 'blue' : 'yellow';
          const bulletColor = proj.id === 'sagaflow' ? 'bg-[#FF9899]' : proj.id === 'lleken' ? 'bg-blue' : 'bg-yellow';

          return (
            <TarjetaRiso key={proj.id} hoverEffect={true} className="flex flex-col h-full justify-between">
              
              {/* Upper Section */}
              <div className="mb-6">
                
                {/* Header: Project Name & Asterisk */}
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-sans text-[22px] font-bold text-ink tracking-tight">
                    {proj.nombre}
                  </h3>
                  <Asterisco color={asterColor} size={20} className="mt-1 flex-shrink-0" />
                </div>

                {/* Subtitle */}
                <p className="text-[13px] text-ink-2 font-mono mb-4 leading-snug">
                  {proj.subtitulo}
                </p>

                {/* SVG Illustration Container */}
                <div className="bg-white border-[1px] border-ink/10 rounded-lg p-2 flex items-center justify-center mb-5">
                  {renderIllustration(proj.id)}
                </div>

                {/* Meta details list (reversed order: ROL, ESTADO, etc.) */}
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {[...proj.meta].reverse().map((metaItem, mIdx) => (
                    <li key={mIdx} className="flex items-start text-ink font-sans text-[13.5px]">
                      <span className={`w-2 h-2 ${bulletColor} border-[1.5px] border-ink inline-block mt-1.5 mr-2.5 flex-shrink-0`} />
                      <span>{metaItem.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Block (Decision/Learning) */}
              <div className={`${decStyles.bg} p-4 border-[1.5px] border-ink ${decStyles.shadow} mt-auto rounded-lg`}>
                <span className="font-mono text-[9px] tracking-[0.12em] block mb-1.5 text-ink-2 font-bold uppercase">
                  {proj.decisionLabel}
                </span>
                <p className="text-[12px] leading-[1.65] text-ink font-normal">
                  {proj.decisionCorta}
                </p>
              </div>

            </TarjetaRiso>
          );
        })}
      </div>
    </section>
  );
}
