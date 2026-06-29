export function Sales() {
  const promos = [
    { title: 'Oferta Cocina', desc: '20% off electrodomésticos', price: '-$50' },
    { title: 'Jardín Flash', desc: 'Herramientas al 30%', price: '-$30' },
    { title: 'Repuestos 2x1', desc: 'Compra uno y lleva otro', price: '2x1' },
    { title: 'Garantía Extra', desc: 'Año adicional gratis', price: 'Gratis' }
  ];

  return (
    <section className="section" style={{ background: 'linear-gradient(to right, #FFA500, #FFD700)' }}>
      <div className="container">
        <h2 style={{ fontFamily: 'Geo', fontSize: '2.5rem', color: '#000', textAlign: 'center', marginBottom: '2rem' }}>
          Promociones Destacadas
        </h2>
        <div className="grid">
          {promos.map((promo, index) => (
            <div key={index} className="card">
              <h3 style={{ color: '#FFA500' }}>{promo.title}</h3>
              <p>{promo.desc}</p>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF4500' }}>
                {promo.price}
              </div>
              <button className="btn">Aprovechar</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
