import React from 'react';
import {
  Asterisco,
  Tape,
  Halftone,
  SubrayadoMarcador,
  OvaloSketch,
  FlechaDoodle,
  SelloCircular,
  SelloStamp,
  GrillaSketch,
  TarjetaRiso
} from './deco/DecoElements';

export default function DecoPreview() {
  return (
    <div className="min-h-screen bg-paper text-ink p-10 font-sans selection:bg-pink-light selection:text-ink relative overflow-hidden">
      {/* Background patterns */}
      <GrillaSketch className="absolute top-0 left-0 w-[200px] h-[200px] text-ink/10 opacity-20 pointer-events-none" />
      <Halftone className="absolute bottom-0 right-0 w-[250px] h-[250px] text-blue/10 opacity-20 pointer-events-none" />

      {/* Header Area */}
      <div className="max-w-[1060px] mx-auto mb-16 relative z-10 text-center">
        <h1 className="text-[52px] font-extrabold tracking-tight mb-2">
          Kit de Componentes{' '}
          <span className="font-serif italic font-normal text-pink drop-shadow-[2px_2px_0_rgba(102,210,255,0.4)] relative inline-block">
            Decorativos
            <SubrayadoMarcador color="pink" className="w-full absolute -bottom-3 left-0 h-[8px]" />
          </span>
        </h1>
        <p className="font-mono text-[12px] text-ink-2 uppercase tracking-widest mt-6">
          Previsualización temporal (/deco-preview) · Estilo Risograph / Sketchbook
        </p>
      </div>

      {/* Grid of components */}
      <div className="max-w-[1060px] mx-auto grid grid-cols-2 gap-10 relative z-10">
        
        {/* 1. Asterisco */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">1. &lt;Asterisco /&gt;</span>
            <span className="font-mono text-[9px] bg-pink/20 text-pink px-2 py-0.5 rounded">6 brazos</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Asterisco de 6 brazos con trazo grueso redondeado de plumón.
          </p>
          <div className="flex items-center gap-6 p-4 bg-paper/50 border border-dashed border-ink/20 rounded justify-center">
            <Asterisco color="pink" size={32} />
            <Asterisco color="blue" size={44} />
            <Asterisco color="yellow" size={24} />
            <Asterisco color="ink" size={36} />
          </div>
        </TarjetaRiso>

        {/* 2. Tape */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">2. &lt;Tape /&gt;</span>
            <span className="font-mono text-[9px] bg-[#FFFACC] text-[#C1B23E] px-2 py-0.5 rounded">Semi-transparente</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Cinta adhesiva beige semitransparente con bordes rotos y rotación sutil.
          </p>
          <div className="flex flex-col gap-4 p-4 bg-paper/50 border border-dashed border-ink/20 rounded items-center justify-center relative min-h-[90px]">
            <Tape color="beige" size={120} />
            <Tape color="pink" size={100} />
            <Tape color="blue" size={80} />
          </div>
        </TarjetaRiso>

        {/* 3. Halftone */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">3. &lt;Halftone /&gt;</span>
            <span className="font-mono text-[9px] bg-blue/20 text-blue px-2 py-0.5 rounded">Patrón</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Patrón de puntos halftone en grilla repetible usando un pattern SVG.
          </p>
          <div className="flex items-center gap-8 p-4 bg-paper/50 border border-dashed border-ink/20 rounded justify-center">
            <Halftone color="blue" width={80} height={80} />
            <Halftone color="yellow" width={80} height={80} />
            <Halftone color="pink" width={80} height={80} />
          </div>
        </TarjetaRiso>

        {/* 4. SubrayadoMarcador */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">4. &lt;SubrayadoMarcador /&gt;</span>
            <span className="font-mono text-[9px] bg-yellow/30 text-ink-2 px-2 py-0.5 rounded">Dinámico</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Trazo horizontal ondulado e imperfecto. Se ajusta automáticamente al contenedor.
          </p>
          <div className="flex flex-col gap-5 p-4 bg-paper/50 border border-dashed border-ink/20 rounded items-center justify-center">
            <div className="w-[180px] text-center font-bold relative">
              Texto de Prueba
              <SubrayadoMarcador color="yellow" className="w-full absolute -bottom-2.5 left-0" />
            </div>
            <div className="w-[130px] text-center font-bold text-pink relative">
              Texto Corto
              <SubrayadoMarcador color="pink" className="w-full absolute -bottom-2.5 left-0" />
            </div>
          </div>
        </TarjetaRiso>

        {/* 5. OvaloSketch */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">5. &lt;OvaloSketch /&gt;</span>
            <span className="font-mono text-[9px] bg-ink/5 text-ink-2 px-2 py-0.5 rounded">Rodeado</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Elipse de trazo manual solapado que rodea una palabra clave.
          </p>
          <div className="flex items-center gap-6 p-4 bg-paper/50 border border-dashed border-ink/20 rounded justify-center min-h-[90px]">
            <OvaloSketch color="pink">Empatía</OvaloSketch>
            <OvaloSketch color="blue">Tecnología</OvaloSketch>
            <OvaloSketch color="yellow">IA</OvaloSketch>
          </div>
        </TarjetaRiso>

        {/* 6. FlechaDoodle */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">6. &lt;FlechaDoodle /&gt;</span>
            <span className="font-mono text-[9px] bg-[#DFF5FF] text-blue px-2 py-0.5 rounded">Sketch</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Flecha curva de trazo irregular con punta simple. Admite rotación.
          </p>
          <div className="flex items-center gap-8 p-4 bg-paper/50 border border-dashed border-ink/20 rounded justify-center">
            <FlechaDoodle color="blue" size={40} rotate={15} />
            <FlechaDoodle color="pink" size={40} rotate={90} />
            <FlechaDoodle color="yellow" size={40} rotate={-45} />
            <FlechaDoodle color="ink" size={40} rotate={180} />
          </div>
        </TarjetaRiso>

        {/* 7. SelloCircular */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">7. &lt;SelloCircular /&gt;</span>
            <span className="font-mono text-[9px] bg-pink/20 text-pink px-2 py-0.5 rounded">Texto en curva</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Sello circular con texto en curva y asterisco central, rotado.
          </p>
          <div className="flex items-center gap-6 p-4 bg-paper/50 border border-dashed border-ink/20 rounded justify-center min-h-[140px]">
            <SelloCircular text="DISEÑO • CURIOSIDAD • BORDE • GRACIA •" color="pink" size={110} rotate={12} />
            <SelloCircular text="AIKIA RIVEROS • PORTAFOLIO •" color="blue" size={100} rotate={-10} />
          </div>
        </TarjetaRiso>

        {/* 8. SelloStamp */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">8. &lt;SelloStamp /&gt;</span>
            <span className="font-mono text-[9px] bg-pink/20 text-pink px-2 py-0.5 rounded">Borde doble</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Timbre ovalado de doble borde irregular con el texto "EN CONSTRUCCIÓN", rotado -8 grados.
          </p>
          <div className="flex items-center gap-6 p-4 bg-paper/50 border border-dashed border-ink/20 rounded justify-center min-h-[140px]">
            <SelloStamp text="EN CONSTRUCCIÓN" color="pink" rotate={-8} />
            <SelloStamp text="VALIDADO LOCAL" color="blue" rotate={5} />
          </div>
        </TarjetaRiso>

        {/* 9. GrillaSketch */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">9. &lt;GrillaSketch /&gt;</span>
            <span className="font-mono text-[9px] bg-ink/5 text-ink-2 px-2 py-0.5 rounded">Fondo</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Grilla de líneas finas imperfectas para fondos de esquinas.
          </p>
          <div className="flex items-center gap-8 p-4 bg-paper/50 border border-dashed border-ink/20 rounded justify-center">
            <GrillaSketch color="ink" width={80} height={80} />
            <GrillaSketch color="pink" width={80} height={80} />
            <GrillaSketch color="blue" width={80} height={80} />
          </div>
        </TarjetaRiso>

        {/* 10. TarjetaRiso */}
        <TarjetaRiso className="flex flex-col gap-4">
          <div className="border-b border-ink/10 pb-2 mb-2 flex justify-between items-center">
            <span className="font-mono text-[12px] font-bold text-ink-2">10. &lt;TarjetaRiso /&gt;</span>
            <span className="font-mono text-[9px] bg-ink/10 text-ink px-2 py-0.5 rounded">Wrapper</span>
          </div>
          <p className="text-[13px] text-ink-2 mb-2 font-normal">
            Tarjeta contenedor: fondo blanco, borde 1.5px ink, esquinas de 12px y sombra dura desplazada de 5px.
          </p>
          <div className="flex items-center justify-center p-4 bg-paper/50 border border-dashed border-ink/20 rounded">
            <TarjetaRiso className="p-4 bg-white text-center text-ink font-mono text-[12px]" hoverEffect={true}>
              ¡Pasa el mouse sobre mí!
            </TarjetaRiso>
          </div>
        </TarjetaRiso>

      </div>

      {/* Back to Home Button */}
      <div className="max-w-[1060px] mx-auto mt-16 text-center pb-10">
        <a
          href="/"
          className="px-6 py-2.5 bg-ink text-paper font-mono text-[11px] tracking-[0.1em] uppercase shadow-hard border-1.5 border-ink transition-all duration-155 ease-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm inline-block"
        >
          ← Volver al Portafolio
        </a>
      </div>
    </div>
  );
}
