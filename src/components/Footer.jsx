import { contenido } from '../data/contenido';

export default function Footer() {
  const { footer } = contenido;

  return (
    <footer className="py-8 px-6 md:px-10 border-t-1.5 border-ink flex flex-col md:flex-row justify-between items-center gap-2 flex-wrap">
      <p className="font-mono text-[10px] tracking-[0.1em] text-ink-2/50 uppercase text-center md:text-left">
        {footer.text}
      </p>
      <p className="font-mono text-[10px] tracking-[0.1em] text-ink-2/50 uppercase text-center md:text-right">
        {footer.year}
      </p>
    </footer>
  );
}
