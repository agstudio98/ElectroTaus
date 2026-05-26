import { useEffect, useRef } from 'react';

const events = [
  {
    year: '1975',
    event: 'Fundación de ElectroTaus',
    detail: 'Juan Pérez abre el primer local con una selección curada de electrodomésticos para el hogar.',
    img: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=420&q=75',
    icon: '🏪',
  },
  {
    year: '1980',
    event: 'Expansión a cocina y jardín',
    detail: 'Se incorporan líneas completas de productos para la cocina profesional y herramientas de jardinería.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=420&q=75',
    icon: '🌿',
  },
  {
    year: '1995',
    event: 'Introducción de repuestos electrónicos',
    detail: 'ElectroTaus se convierte en referente de repuestos originales con técnicos certificados.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=420&q=75',
    icon: '⚙️',
  },
  {
    year: '2010',
    event: 'Garantía absoluta implementada',
    detail: 'Primer retailer de la región en ofrecer garantía extendida ilimitada sobre productos propios.',
    img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=420&q=75',
    icon: '🛡️',
  },
  {
    year: '2024',
    event: 'Sitio web moderno lanzado',
    detail: 'ElectroTaus entra al mundo digital con catálogo online, chatbot y sistema de promociones en tiempo real.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=420&q=75',
    icon: '🚀',
  },
];

export function Timeline() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateX(0) rotateY(0deg)';
          }
        });
      },
      { threshold: 0.15 }
    );
    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section timeline-section">
      {/* Fondo geométrico decorativo */}
      <div className="timeline-bg" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`tl-hex tl-hex-${i}`} />
        ))}
      </div>

      <div className="container">
        <div className="section-header animate-rise">
          <span className="section-eyebrow">Historia ElectroTaus</span>
          <h2 style={{ fontFamily: 'Geo', fontSize: '2.5rem', color: '#000' }}>Cronología</h2>
        </div>

        <div className="timeline-3d">
          {/* Línea central */}
          <div className="timeline-spine" aria-hidden="true">
            <div className="timeline-spine-glow" />
          </div>

          {events.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`tl-entry ${isEven ? 'tl-left' : 'tl-right'}`}
                style={{
                  opacity: 0,
                  transform: `translateX(${isEven ? '-40px' : '40px'}) rotateY(${isEven ? '-8deg' : '8deg'})`,
                  transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
                }}
              >
                {/* Nodo en la línea */}
                <div className="tl-node">
                  <span className="tl-node-icon">{item.icon}</span>
                </div>

                <div className="tl-card">
                  <div className="tl-card-img-wrap">
                    <img src={item.img} alt={item.event} className="tl-card-img" />
                    <div className="tl-card-img-overlay" />
                    <div className="tl-year-badge">{item.year}</div>
                  </div>
                  <div className="tl-card-body">
                    <h3 className="tl-card-title">{item.event}</h3>
                    <p className="tl-card-detail">{item.detail}</p>
                  </div>
                  <div className="tl-card-accent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}