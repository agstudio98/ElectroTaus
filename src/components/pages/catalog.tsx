import { useState } from 'react';

const products = [
  { id: 1,  name: 'Horno Eléctrico', category: 'cocina',    price: 250 },
  { id: 2,  name: 'Cortacésped',     category: 'jardin',    price: 180 },
  { id: 3,  name: 'Placa TV',        category: 'repuestos', price: 80  },
  { id: 4,  name: 'Batidora',        category: 'cocina',    price: 60  },
  { id: 5,  name: 'Tijeras Podar',   category: 'jardin',    price: 25  },
  { id: 6,  name: 'Control Remoto',  category: 'repuestos', price: 15  },
  { id: 7,  name: 'Microondas',      category: 'cocina',    price: 120 },
  { id: 8,  name: 'Aspersor',        category: 'jardin',    price: 35  },
  { id: 9,  name: 'Tarjeta Madre',   category: 'repuestos', price: 90  },
  { id: 10, name: 'Licuadora',       category: 'cocina',    price: 70  },
  { id: 11, name: 'Pala Jardín',     category: 'jardin',    price: 20  },
  { id: 12, name: 'Cable HDMI',      category: 'repuestos', price: 10  },
];

/* Icono SVG minimalista según categoría */
function CategoryIcon({ category }: { category: string }) {
  if (category === 'cocina') return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" style={{ opacity: 0.32 }}>
      <rect x="7" y="11" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 16h24" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="13" cy="13.5" r="1.5" fill="currentColor"/>
      <circle cx="19" cy="13.5" r="1.5" fill="currentColor"/>
    </svg>
  );
  if (category === 'jardin') return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" style={{ opacity: 0.32 }}>
      <path d="M19 30V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 18C19 18 11 16 11 9C15 9 19 13 19 18Z" fill="currentColor"/>
      <path d="M19 22C19 22 27 20 27 13C23 13 19 17 19 22Z" fill="currentColor"/>
    </svg>
  );
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" style={{ opacity: 0.32 }}>
      <rect x="8" y="9" width="22" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 24v5M24 24v5M11 29h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function priceInRange(price: number, range: string) {
  if (range === 'bajo')  return price <= 100;
  if (range === 'medio') return price > 100 && price <= 500;
  if (range === 'alto')  return price > 500;
  return true;
}

export function Catalog() {
  const [category, setCategory] = useState('todos');
  const [price, setPrice]       = useState('todos');
  const [added, setAdded]       = useState<number | null>(null);

  const categories = [
    { value: 'todos',     label: 'Todos'     },
    { value: 'cocina',    label: 'Cocina'    },
    { value: 'jardin',    label: 'Jardín'    },
    { value: 'repuestos', label: 'Repuestos' },
  ];

  const priceRanges = [
    { value: 'todos', label: 'Todos los precios' },
    { value: 'bajo',  label: 'Hasta $100'        },
    { value: 'medio', label: '$100 – $500'        },
    { value: 'alto',  label: '$500+'              },
  ];

  const filtered = products.filter(
    (p) => (category === 'todos' || p.category === category) && priceInRange(p.price, price)
  );

  const handleContact = (p: typeof products[0]) => {
    setAdded(p.id);
    setTimeout(() => setAdded(null), 2000);
    alert(`Tratando de contactar por ${p.name}. Enviar WhatsApp o email.`);
  };

  return (
    <section className="section">

      {/* ── Barra de filtros ── */}
      <div className="catalog-filters-bar">
        <div className="container">
          <div className="catalog-filters-container">

            {/* Pills scrollable */}
            <div className="filter-pills-scroll">
              {categories.map((c) => (
                <button
                  key={c.value}
                  className={`filter-pill${category === c.value ? ' active' : ''}`}
                  onClick={() => setCategory(c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Select precio */}
            <div className="filter-group">
              <span className="filter-label">
                Precio:
              </span>
              <select value={price} onChange={(e) => setPrice(e.target.value)}>
                {priceRanges.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Catálogo de Productos
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid catalog-grid">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className="card animate-fade-up"
                style={{ animationDelay: `${idx * 45}ms` }}
              >
                {/* Imagen placeholder */}
                <div style={{
                  width: '100%', height: 110,
                  background: 'var(--bg-2)', borderRadius: 3,
                  marginBottom: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
                  color: 'var(--text-h)',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }} />
                  <CategoryIcon category={product.category} />
                </div>

                {/* Badge */}
                <span className={`category-badge ${product.category}`} style={{ marginBottom: '0.6rem' }}>
                  {product.category}
                </span>

                {/* Nombre */}
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500, letterSpacing: 0, color: 'var(--text-h)', margin: '0.4rem 0 0.5rem' }}>
                  {product.name}
                </h3>

                {/* Precio */}
                <div className="price-tag" style={{ marginBottom: '1.1rem' }}>
                  <span className="currency">$</span>
                  {product.price.toLocaleString()}
                </div>

                {/* CTA */}
                <button
                  className="btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleContact(product)}
                >
                  {added === product.id ? '✓ Enviado' : 'Contactar'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-dim)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.3 }}>◎</div>
            <p style={{ fontSize: '0.9rem' }}>Sin resultados para ese filtro.</p>
          </div>
        )}
      </div>

    </section>
  );
}