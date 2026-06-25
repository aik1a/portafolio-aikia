import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SobreMi from './components/SobreMi';
import Habilidades from './components/Habilidades';
import Proyectos from './components/Proyectos';
import Formacion from './components/Formacion';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import DecoPreview from './components/DecoPreview';
import StudioOpen from './components/StudioOpen/StudioOpen';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);
  // Configurar IntersectionObserver para animaciones de fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.07,
        rootMargin: '0px 0px -50px 0px', // Gatilla un poco antes de entrar a la vista completa
      }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => {
        try {
          observer.unobserve(el);
        } catch {
          // Evitar errores si los elementos ya no existen al desmontar
        }
      });
    };
  }, []);

  if (currentPath === '/deco-preview') {
    return <DecoPreview />;
  }

  return (
    <div className="relative min-h-screen bg-paper flex flex-col font-sans selection:bg-pink-light selection:text-ink">
      <Header />
      <main className="flex-grow">
        <Hero />
        <SobreMi />
        <Habilidades />
        <Proyectos />
        <Formacion />
        <Contacto />
      </main>
      <Footer />
      <StudioOpen />
    </div>
  );
}
