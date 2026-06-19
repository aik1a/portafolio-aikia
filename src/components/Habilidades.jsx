import { contenido } from '../data/contenido';
import { Asterisco, FlechaDoodle, SubrayadoMarcador, TarjetaRiso, Tape, Halftone } from './deco/DecoElements';
import useRevelar from '../hooks/useRevelar';

export default function Habilidades() {
  const { habilidades } = contenido;
  const [sectionRef, isVisible] = useRevelar();

  const titleMap = {
    'DISEÑO Y UX': 'Diseño y UX',
    'PRODUCTO': 'Producto',
    'IA APLICADA': 'IA aplicada',
    'STACK Y MÉTODOS': 'Stack y métodos'
  };

  const cardConfigs = [
    {
      bgCircle: 'bg-[#FFF2F2]',
      textClass: 'text-[#FF9899] font-bold',
      bulletBg: 'bg-[#FF9899]',
      hasTape: true,
      tapeColor: 'pink',
      tapeRotation: 'transform -rotate-[4deg]',
      icon: (
        <svg className="w-4.5 h-4.5 text-[#FF9899]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      )
    },
    {
      bgCircle: 'bg-blue-lleken',
      textClass: 'text-[#66D2FF] font-bold',
      bulletBg: 'bg-blue',
      hasTape: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-[#66D2FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 16-9 .5-9-.5V8l9-4 9 4Z" />
          <path d="M12 22.5V12.5" />
          <path d="m21 8.5-9 4-9-4" />
        </svg>
      )
    },
    {
      bgCircle: 'bg-[#FFFACC]',
      textClass: 'text-[#F1C200] font-bold', // Readable darker yellow
      bulletBg: 'bg-[#FEEE74]',
      hasTape: true,
      tapeColor: 'yellow',
      tapeRotation: 'transform rotate-[5deg]',
      icon: (
        <svg className="w-4.5 h-4.5 text-[#FEEE74]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
        </svg>
      )
    },
    {
      bgCircle: 'bg-blue-lleken',
      textClass: 'text-[#66D2FF] font-bold',
      bulletBg: 'bg-blue',
      hasTape: false,
      icon: (
        <svg className="w-4.5 h-4.5 text-[#66D2FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    }
  ];

  return (
    <section id="habilidades" ref={sectionRef} className="py-20 px-6 md:px-10 max-w-[1060px] mx-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3.2fr] gap-12 md:gap-14 items-start">
        
        {/* Left Column: Title and Doodles */}
        <div className="flex flex-col items-start relative">
          
          {/* Blue Halftone near title */}
          <Halftone className="absolute top-[-30px] left-[-20px] w-[80px] h-[80px] text-blue/15 z-0" />

          <div className="relative mb-6 inline-block z-10">
            <h2 className="font-sans text-[36px] md:text-[48px] font-extrabold leading-none tracking-tight text-ink">
              <span className="relative inline-block">
                Habilidades
                <SubrayadoMarcador color="pink" className="w-full absolute -bottom-3 left-0 h-[6px]" />
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-6 mt-8 pl-2 z-10">
            <Asterisco color="blue" size={32} className="animate-[pulse_3s_infinite]" />
            <FlechaDoodle color="yellow" rotate={20} className="w-12 h-9" />
          </div>
        </div>

        {/* Right Column: 4-card aligned grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {habilidades.categorias.map((cat, idx) => {
            const config = cardConfigs[idx] || cardConfigs[0];
            const displayTitle = titleMap[cat.nombre] || cat.nombre;

            return (
              <div 
                key={idx} 
                className={`relative transition-all duration-700 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Masking tape on top if card configuration requires it */}
                {config.hasTape && (
                  <Tape color={config.tapeColor} className={`top-[-14px] left-[35%] z-20 ${config.tapeRotation}`} />
                )}

                <TarjetaRiso className="h-full">
                  {/* Card Header: Circle with icon and colored title */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${config.bgCircle} border-[1.5px] border-ink`}>
                      {config.icon}
                    </div>
                    <h3 className={`font-sans text-[18px] tracking-tight ${config.textClass}`}>
                      {displayTitle}
                    </h3>
                  </div>

                  {/* Bulleted List */}
                  <ul className="flex flex-col gap-3 list-none p-0 m-0">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start text-ink-2 font-mono text-[14px]">
                        <span className={`w-2 h-2 ${config.bulletBg} border-[1px] border-ink inline-block mt-1.5 mr-2.5 flex-shrink-0`} />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </TarjetaRiso>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
