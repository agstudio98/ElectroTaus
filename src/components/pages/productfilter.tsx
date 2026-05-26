import { useState } from 'react';

export function ProductFilter() {
  const [category, setCategory] = useState('todos');
  const [price, setPrice]       = useState('todos');

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

  return (
    <section className="section" style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: '1.75rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          {/* Pills de categoría */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
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

          {/* Select de precio */}
          <div className="filter-group">
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
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
    </section>
  );
}