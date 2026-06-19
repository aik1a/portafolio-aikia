import { useEffect, useRef, useState } from 'react';

export default function useRevelar() {
  const ref = useRef(null);
  const [revelado, setRevelado] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevelado(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);

    return () => {
      try {
        observer.unobserve(el);
      } catch (e) {
        // avoid errors when unmounting if element no longer exists
      }
    };
  }, []);

  return [ref, revelado];
}
