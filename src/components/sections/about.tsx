import { useRef, useEffect } from 'react';

export function About() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.about-card');
    if (!cards) return;

    const handleMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-8px)`;
    };
    const handleLeave = (card: HTMLElement) => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    };

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => handleMove(e as MouseEvent, card));
      card.addEventListener('mouseleave', () => handleLeave(card));
    });
    return () => {
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true));
      });
    };
  }, []);

  const values = [
    { icon: '🛡️', label: 'Garantía total', desc: 'Respaldo en todos nuestros productos' },
    { icon: '⚙️', label: 'Calidad técnica', desc: 'Repuestos y equipos de primera línea' },
    { icon: '🌿', label: 'Jardín & Hogar', desc: 'Soluciones integrales para cada espacio' },
  ];

  return (
    <section className="section about-section">
      <div className="about-bg-geo" aria-hidden="true">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <polygon points="300,40 560,200 460,500 140,500 40,200" fill="none" stroke="rgba(255,215,0,0.07)" strokeWidth="1.5" />
          <polygon points="300,100 500,220 420,460 180,460 100,220" fill="none" stroke="rgba(255,165,0,0.05)" strokeWidth="1" />
        </svg>
      </div>

      <div className="container" ref={cardsRef}>
        <div className="section-header animate-rise">
          <span className="section-eyebrow">Nuestra historia</span>
          <h2 style={{ fontFamily: 'Geo', fontSize: '2.5rem', color: '#000' }}>Sobre el Fundador</h2>
        </div>

        {/* Founder card — hero */}
        <div className="about-founder-card about-card animate-rise delay-1">
          <div className="founder-img-col">
            <div className="founder-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80"
                alt="Juan Pérez, fundador de ElectroTaus"
                className="founder-img"
              />
              <div className="founder-img-ring" />
              <div className="founder-year-tag">Est. 1975</div>
            </div>
          </div>

          <div className="founder-text-col">
            <div className="badge" style={{ marginBottom: '1rem' }}>Fundador & Visionario</div>
            <h3 className="founder-name">Juan Pérez</h3>
            <p className="founder-bio">
              Con una visión adelantada a su tiempo, Juan fundó ElectroTaus en 1975 con una premisa simple:
              llevar electrodomésticos de calidad real a los hogares argentinos. Más de cuatro décadas después,
              su legado sigue siendo la brújula de cada decisión que tomamos.
            </p>
            <div className="founder-signature">
              <span className="signature-text">Juan Pérez</span>
              <span className="signature-role">Fundador, ElectroTaus</span>
            </div>
          </div>
        </div>

        {/* Misión card */}
        <div className="about-mission-card about-card animate-rise delay-2">
          <div className="mission-img-col">
            <img
              src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80"
              alt="Taller de reparaciones ElectroTaus"
              className="mission-img"
            />
            <div className="mission-img-overlay" />
          </div>
          <div className="mission-text-col">
            <span className="section-eyebrow">Nuestra razón de ser</span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#000' }}>Misión</h3>
            <p style={{ color: '#555', lineHeight: 1.8 }}>
              Proporcionar productos para cocina, jardín y repuestos electrónicos con garantía absoluta,
              asistencia técnica y la confianza de medio siglo de experiencia.
            </p>
          </div>
        </div>

        {/* Values row */}
        <div className="about-values-grid">
          {values.map((v, i) => (
            <div key={i} className={`about-value-card about-card animate-rise delay-${i + 2}`}>
              <div className="value-icon">{v.icon}</div>
              <h4 className="value-label">{v.label}</h4>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}