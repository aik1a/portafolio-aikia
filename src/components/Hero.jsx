import React from 'react';
import { contenido } from '../data/contenido';
import { Asterisco, SelloCircular, GrillaSketch, Halftone, OvaloSketch, SubrayadoMarcador } from './deco/DecoElements';

export default function Hero() {
  const { hero } = contenido;

  return (
    <section
      id="hero"
      className="min-h-screen pt-32 pb-20 px-10 relative overflow-hidden flex items-center bg-paper"
    >
      <div className="w-full max-w-[1060px] mx-auto grid grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
        
        {/* Columna izquierda: Textos, Badges y Botones */}
        <div className="flex flex-col items-start text-left">
          
          {/* Firma rosa Aikia Riveros con un asterisco decorativo */}
          <div className="relative mb-6 inline-block">
            <span className="font-serif italic text-[24px] text-ink bg-pink-light/70 px-4 py-2 border-b border-pink/50 rounded-sm transform -rotate-[1deg] shadow-[2px_2px_0_rgba(26,26,26,0.12)] inline-block select-none font-normal tracking-wide">
              Aikia Riveros
            </span>
            <Asterisco 
              color="pink" 
              size={24} 
              className="absolute -top-4 -right-6 z-0 animate-deco" 
              style={{ animationDelay: '0.6s' }} 
            />
          </div>

          {/* Título */}
          <div className="relative mb-8 inline-block">
            <h1 className="font-sans font-extrabold text-[76px] leading-[1.05] text-ink tracking-tight">
              Diseñador de <br />
              <span className="inline-block mt-3 relative">
                <OvaloSketch color="blue" padding="px-5 py-1">
                  producto.
                </OvaloSketch>
                <SubrayadoMarcador color="pink" className="w-full absolute -bottom-4 left-0 h-[8px]" />
              </span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-[16px] text-ink-2 max-w-[480px] leading-[1.8] mb-8 font-normal">
            Especializado en experiencias con IA e impacto social. <br />
            Construyo desde la curiosidad, con perspectiva humana y social como base.
          </p>

          {/* Fila de 4 badges pill */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {/* UX/UI: fondo pink-light */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-light/50 border border-ink text-[12px] font-mono text-ink rounded-full">
              <svg className="w-3.5 h-3.5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="2" width="12" height="12" rx="1.5" />
                <path d="M6 2v12M2 6h12" />
              </svg>
              <span>UX/UI</span>
            </div>

            {/* IA aplicada: fondo celeste claro */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-lleken border border-ink text-[12px] font-mono text-ink rounded-full">
              <svg className="w-3.5 h-3.5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="8" cy="8" r="2" />
                <path d="M8 2v2M8 12v2M2 8h2M12 8h2M4 4l2 2M10 10l2 2M4 12l2-2M10 6l2-2" />
              </svg>
              <span>IA aplicada</span>
            </div>

            {/* Impacto social: fondo amarillo claro */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-yellow-kellun border border-ink text-[12px] font-mono text-ink rounded-full">
              <svg className="w-3.5 h-3.5 text-pink" viewBox="0 0 16 16" fill="currentColor" stroke="none" aria-hidden="true">
                <path d="M8 14.5l-1-.9C3.5 10.3 1 8.2 1 5.6 1 3.5 2.6 2 4.7 2c1.2 0 2.4.6 3.3 1.5C8.9 2.6 10.1 2 11.3 2 13.4 2 15 3.5 15 5.6c0 2.6-2.5 4.7-6 8l-1 .9z" />
              </svg>
              <span>Impacto social</span>
            </div>

            {/* Santiago, Chile: fondo blanco, borde ink, pin */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-ink text-[12px] font-mono text-ink rounded-full">
              <svg className="w-3.5 h-3.5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 2a4.5 4.5 0 0 0-4.5 4.5c0 3.5 4.5 7.5 4.5 7.5s4.5-4 4.5-7.5A4.5 4.5 0 0 0 8 2z" />
                <circle cx="8" cy="6.5" r="1.5" />
              </svg>
              <span>Santiago, Chile</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 items-center">
            {/* Ver proyectos → */}
            <a
              href="#proyectos"
              className="px-7 py-3.5 bg-blue text-white font-mono text-[12px] font-bold tracking-[0.08em] uppercase border-1.5 border-ink rounded-full shadow-[4px_4px_0_rgba(26,26,26,1)] transition-all duration-155 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(26,26,26,1)] block"
            >
              Ver proyectos →
            </a>
            {/* Contacto ↗ */}
            <a
              href="#contacto"
              className="px-7 py-3.5 bg-white text-ink font-mono text-[12px] font-bold tracking-[0.08em] uppercase border-1.5 border-ink rounded-full shadow-[4px_4px_0_rgba(26,26,26,1)] transition-all duration-155 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_rgba(26,26,26,1)] block"
            >
              Contacto ↗
            </a>
          </div>
        </div>

        {/* Columna derecha: Avatar e Ilustraciones decorativas */}
        <div className="relative flex items-center justify-center h-[400px]">
          {/* Halftone celeste enmarcando el avatar */}
          <Halftone 
            className="absolute -top-4 -right-4 w-[140px] h-[140px] text-blue/35 z-0 animate-deco" 
            style={{ animationDelay: '0.8s' }} 
          />
          
          {/* Asterisco azul pequeño abajo a la derecha, completando la diagonal */}
          <Asterisco 
            color="blue" 
            size={18} 
            className="absolute bottom-12 -right-2 z-0 animate-deco" 
            style={{ animationDelay: '1.0s' }} 
          />
          
          {/* GrillaSketch como textura secundaria sutil */}
          <GrillaSketch 
            className="absolute top-[35%] -right-16 w-[120px] h-[120px] text-ink/5 opacity-10 z-0 animate-deco" 
            style={{ animationDelay: '1.2s' }} 
          />

          {/* Imagen de avatar de Aikia con sombra dura y efecto hover */}
          <img
            src="/avatar-aikia.png"
            alt="Aikia Riveros"
            className="h-[340px] object-contain relative z-10 animate-avatar transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:scale-[1.02] [filter:drop-shadow(6px_6px_0px_#1A1A1A)] hover:[filter:drop-shadow(10px_10px_0px_#FF9899)]"
          />
        </div>

      </div>
    </section>
  );
}
