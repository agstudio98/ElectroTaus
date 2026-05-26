import { useRef, useEffect } from 'react';

const products = [
  {
    name: 'Horno Eléctrico',
    desc: 'Alta eficiencia energética, cocción uniforme en 6 modos.',
    tag: 'Más vendido',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
    price: '$89.999',
    category: 'Cocina',
  },
  {
    name: 'Set Jardinería Pro',
    desc: 'Herramientas profesionales de acero inoxidable, mango ergonómico.',
    tag: 'Nuevo',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80',
    price: '$34.500',
    category: 'Jardín',
  },
  {
    name: 'Repuestos TV',
    desc: 'Placas originales garantizadas para todas las marcas líderes.',
    tag: 'Stock disponible',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    price: '$12.000',
    category: 'Electrónica',
  },
  {
    name: 'Licuadora Pro',
    desc: '2000W de potencia industrial, jarra de vidrio templado 2L.',
    tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=80',
    price: '$54.999',
    category: 'Cocina',
  },
];

export function Offerts() {
  const gridRef = useRef<HTMLDivElement>(null);

  // 3D tilt on hover
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.product-flip-card');
    if (!cards) return;
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        card.style.transform = `perspective(900px) rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg) scale(1.03)`;
      };
      const leave = () => { card.style.transform = ''; };
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      handlers.push({ el: card, move, leave });
    });

    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    });
  }, []);

  return (
    <section className="section offerts-section">
      <div className="container">
        <div className="section-header animate-rise">
          <span className="section-eyebrow">Lo mejor de ElectroTaus</span>
          <h2 style={{ fontFamily: 'Geo', fontSize: '2.5rem', color: '#000' }}>Catálogos Destacados</h2>
        </div>

        <div className="offerts-grid" ref={gridRef}>
          {products.map((product, index) => (
            <div
              key={index}
              className={`product-flip-card animate-rise delay-${index + 1}`}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              {/* Imagen con overlay */}
              <div className="product-img-wrap">
                <img src={product.img} alt={product.name} className="product-img" />
                <div className="product-img-overlay" />
                <span className="product-tag badge">{product.tag}</span>
                <span className="product-category">{product.category}</span>
              </div>

              {/* Cuerpo */}
              <div className="product-body">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="btn product-btn">Ver Más</button>
                </div>
              </div>

              {/* Accent inferior */}
              <div className="product-card-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}