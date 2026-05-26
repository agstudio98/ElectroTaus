import React, { useState } from 'react';

const slides = [
  {
    title: '¡Descubrí nuestras ofertas en cocina!',
    sub: 'Hornos, licuadoras y más — calidad que dura décadas.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    cta: 'Ver electrodomésticos',
    accent: '#FFA500',
  },
  {
    title: 'Herramientas de jardín premium',
    sub: 'Equipamiento profesional para cada espacio verde.',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
    cta: 'Explorar jardín',
    accent: '#FFD700',
  },
  {
    title: 'Repuestos con garantía absoluta',
    sub: 'Originales certificados. Técnicos especializados en todos los modelos.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    cta: 'Ver repuestos',
    accent: '#FFA500',
  },
];

export function Carrousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goTo = (index: number, dir: 'next' | 'prev' = 'next') => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 500);
  };

  const next = () => goTo((current + 1) % slides.length, 'next');
  const prev = () => goTo((current - 1 + slides.length) % slides.length, 'prev');

  const slide = slides[current];

  return (
    <section className="section carousel-section">
      <div className="container">
        <div className="section-header animate-rise">
          <span className="section-eyebrow">Destacados</span>
          <h2 style={{ fontFamily: 'Geo', fontSize: '2.5rem', color: '#000' }}>Slide Destacado</h2>
        </div>

        <div className={`carousel-3d ${animating ? `carousel-exit-${direction}` : 'carousel-active'}`}>
          {/* Imagen de fondo */}
          <div className="carousel-bg-wrap">
            <img
              src={slide.img}
              alt={slide.title}
              className="carousel-bg-img"
            />
            <div className="carousel-bg-overlay" />
          </div>

          {/* Contenido */}
          <div className="carousel-inner">
            <div className="carousel-text">
              <span className="badge carousel-badge" style={{ background: slide.accent }}>
                ElectroTaus
              </span>
              <h3 className="carousel-title" style={{ color: slide.accent }}>
                {slide.title}
              </h3>
              <p className="carousel-sub">{slide.sub}</p>
              <button className="btn carousel-cta-btn">{slide.cta}</button>
            </div>

            {/* Miniatura de producto en el slide */}
            <div className="carousel-thumb-wrap">
              <div className="carousel-thumb-ring" />
              <img src={slide.img} alt="" className="carousel-thumb" />
            </div>
          </div>

          {/* Controles */}
          <button className="carousel-arrow carousel-arrow-prev" onClick={prev} aria-label="Anterior">
            ‹
          </button>
          <button className="carousel-arrow carousel-arrow-next" onClick={next} aria-label="Siguiente">
            ›
          </button>

          {/* Dots */}
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="carousel-progress">
            <div
              className="carousel-progress-bar"
              key={current}
              style={{ '--accent': slide.accent } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}