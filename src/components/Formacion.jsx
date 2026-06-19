import { contenido } from '../data/contenido';
import { SubrayadoMarcador, Tape } from './deco/DecoElements';

export default function Formacion() {
  const { formacion } = contenido;

  return (
    <section id="formacion" className="py-20 px-6 md:px-10 max-w-[1060px] mx-auto relative fade-in-section">
      
      <div className="relative mb-14 inline-block">
        <h2 className="font-sans text-[36px] md:text-[48px] font-extrabold leading-none tracking-tight text-ink">
          <span className="relative inline-block">
            Formación
            <SubrayadoMarcador color="pink" className="w-full absolute -bottom-3 left-0 h-[6px]" />
          </span>
        </h2>
      </div>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1.8fr_0.9fr] gap-12 md:gap-14 items-center">
        
        {/* Left Column: Timeline */}
        <div className="relative pl-8 border-l-[1.5px] border-ink/15 flex flex-col gap-8 py-2">
          {formacion.items.map((item, idx) => {
            const colors = ['bg-[#FF9899]', 'bg-[#66D2FF]', 'bg-[#FEEE74]'];
            const ringColors = ['border-[#FF9899]', 'border-[#66D2FF]', 'border-[#FEEE74]'];
            
            const colorClass = colors[idx % 3];
            const ringColorClass = ringColors[idx % 3];

            return (
              <div key={idx} className="relative flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 md:gap-4">
                
                {/* Timeline Marker */}
                <div className="absolute left-[-39.5px] top-[6px] flex items-center justify-center w-4 h-4">
                  {item.enCurso ? (
                    <div className={`w-3.5 h-3.5 rounded-full border-2 ${ringColorClass} bg-paper flex items-center justify-center`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${colorClass}`} />
                    </div>
                  ) : (
                    <div className={`w-2.5 h-2.5 rounded-full ${colorClass} border-[1.5px] border-ink`} />
                  )}
                </div>

                {/* Left Side: Title */}
                <span className="font-bold text-[15px] text-ink leading-tight">
                  {item.titulo}
                </span>

                {/* Right Side: Institution & Year */}
                <span className="font-mono text-[11.5px] text-ink-2 opacity-75 sm:text-right flex-shrink-0">
                  {item.inst}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: Rotated Yellow Post-it with Rocket SVG */}
        <div className="flex justify-center relative mt-8 md:mt-0">
          <div className="relative bg-[#FFFACC] p-4 border-1.5 border-ink shadow-hard transform rotate-[3deg] max-w-[200px] w-full aspect-square flex flex-col items-center justify-center">
            {/* Wobbly pink tape at the top */}
            <Tape color="pink" className="-top-4.5 left-[22%] z-20" />
            
            {/* Crayon-style stacked books SVG */}
            <svg 
              viewBox="0 0 160 160" 
              className="w-full h-full text-ink stroke-current fill-none" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-label="Doodle de libros estilo crayón"
            >
              {/* Stack of books (Rescaled to fit beautifully) */}
              <g transform="translate(7, 26) scale(1.1)">
                {/* Book 1 (Bottom, Blue) */}
                <path d="M 25,90 L 110,90 L 105,108 L 20,108 Z" fill="white" stroke="#1A1A1A" strokeWidth="1.8" />
                <line x1="22" y1="96" x2="107" y2="96" stroke="#1A1A1A" strokeWidth="1" opacity="0.4" />
                <line x1="21" y1="102" x2="106" y2="102" stroke="#1A1A1A" strokeWidth="1" opacity="0.4" />
                <path d="M 15,90 C 15,90 8,90 8,99 C 8,108 15,108 15,108 L 105,108 C 105,108 112,108 112,99 C 112,90 105,90 105,90 Z" fill="#66D2FF" stroke="#1A1A1A" strokeWidth="2" />
                <line x1="15" y1="90" x2="15" y2="108" stroke="#1A1A1A" strokeWidth="1.5" />
                
                {/* Book 2 (Middle, Pink) */}
                <g transform="translate(8, -22) rotate(-1.5)">
                  <path d="M 25,90 L 110,90 L 105,108 L 20,108 Z" fill="white" stroke="#1A1A1A" strokeWidth="1.8" />
                  <line x1="22" y1="96" x2="107" y2="96" stroke="#1A1A1A" strokeWidth="1" opacity="0.4" />
                  <line x1="21" y1="102" x2="106" y2="102" stroke="#1A1A1A" strokeWidth="1" opacity="0.4" />
                  <path d="M 15,90 C 15,90 8,90 8,99 C 8,108 15,108 15,108 L 105,108 C 105,108 112,108 112,99 C 112,90 105,90 105,90 Z" fill="#FF9899" stroke="#1A1A1A" strokeWidth="2" />
                  <line x1="15" y1="90" x2="15" y2="108" stroke="#1A1A1A" strokeWidth="1.5" />
                </g>

                {/* Book 3 (Top, Yellow) */}
                <g transform="translate(14, -42) rotate(4)">
                  <path d="M 25,90 L 110,90 L 105,108 L 20,108 Z" fill="white" stroke="#1A1A1A" strokeWidth="1.8" />
                  <line x1="22" y1="96" x2="107" y2="96" stroke="#1A1A1A" strokeWidth="1" opacity="0.4" />
                  <line x1="21" y1="102" x2="106" y2="102" stroke="#1A1A1A" strokeWidth="1" opacity="0.4" />
                  <path d="M 15,90 C 15,90 8,90 8,99 C 8,108 15,108 15,108 L 105,108 C 105,108 112,108 112,99 C 112,90 105,90 105,90 Z" fill="#FEEE74" stroke="#1A1A1A" strokeWidth="2" />
                  <line x1="15" y1="90" x2="15" y2="108" stroke="#1A1A1A" strokeWidth="1.5" />
                </g>

                {/* Apple sketch on top */}
                <path d="M 55,30 C 50,22 65,15 70,24 C 75,15 90,22 85,30 C 80,38 60,38 55,30 Z" fill="#FF9899" stroke="#1A1A1A" strokeWidth="1.5" transform="translate(-10, -5)" />
                <path d="M 70,18 Q 72,12 76,14" stroke="#1A1A1A" strokeWidth="1.5" fill="none" transform="translate(-10, -5)" />
              </g>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
