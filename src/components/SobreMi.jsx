import React from 'react';
import { contenido } from '../data/contenido';
import { Asterisco, SubrayadoMarcador } from './deco/DecoElements';

export default function SobreMi() {
  const { sobreMi } = contenido;

  return (
    <section id="sobre-mi" className="py-20 px-6 md:px-10 max-w-[1060px] mx-auto relative fade-in-section">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr_1.8fr] gap-12 md:gap-14 items-start">
        
        {/* Column 1: Title and doodles */}
        <div className="flex flex-col items-start">
          <div className="relative mb-6 inline-block">
            <h2 className="font-sans text-[36px] md:text-[48px] font-extrabold leading-none tracking-tight text-ink">
              Sobre{' '}
              <span className="relative inline-block">
                mí
                <SubrayadoMarcador color="pink" className="w-full absolute -bottom-3 left-0 h-[6px]" />
              </span>
            </h2>
          </div>
          
          <div className="relative mt-8 pl-2 flex flex-col gap-5">
            <Asterisco color="pink" size={32} />
          </div>
        </div>

        {/* Column 2: Biography with wobbly vertical blue line */}
        <div className="relative pl-6 py-1">
          {/* Custom wobbly vertical blue line */}
          <svg className="absolute left-0 top-0 bottom-0 h-full w-[4px] text-blue" preserveAspectRatio="none" fill="none" viewBox="0 0 4 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M2,2 C1,25 3,50 2,75 C1,85 3,95 2,98" />
          </svg>
          <p className="text-[15px] md:text-[16px] text-ink-2 leading-[1.85] font-normal">
            {sobreMi.biografia}
          </p>
        </div>

        {/* Column 3: Highlighted quote in Playfair italic with blue/yellow quotation marks */}
        <div className="relative flex flex-col justify-center py-6 px-4">
          {/* Large blue opening quote */}
          <span className="absolute top-0 left-[-10px] font-serif text-[72px] leading-none text-blue select-none pointer-events-none opacity-85">
            “
          </span>
          
          {/* Quote text with specific word underlines */}
          <p className="font-serif text-[20px] md:text-[23px] italic leading-[1.7] text-ink relative z-10 pl-6 pr-6">
            Construyo desde la{' '}
            <span className="relative inline-block">
              curiosidad,
              <SubrayadoMarcador color="blue" className="w-full absolute bottom-[-4px] left-0" />
            </span>{' '}
            con perspectiva humana y{' '}
            <span className="relative inline-block">
              social como base.
              <SubrayadoMarcador color="yellow" className="w-full absolute bottom-[-4px] left-0" />
            </span>
          </p>
          
          {/* Large yellow closing quote */}
          <span className="absolute bottom-[-15px] right-2 font-serif text-[72px] leading-none text-yellow select-none pointer-events-none opacity-85">
            ”
          </span>
        </div>

      </div>
    </section>
  );
}
