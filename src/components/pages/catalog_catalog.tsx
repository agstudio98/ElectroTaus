const products = [
  { id: 1, name: 'Horno Eléctrico', category: 'cocina', price: 250 },
  { id: 2, name: 'Cortacésped', category: 'jardin', price: 180 },
  { id: 3, name: 'Placa TV', category: 'repuestos', price: 80 },
  { id: 4, name: 'Batidora', category: 'cocina', price: 60 },
  { id: 5, name: 'Tijeras Podar', category: 'jardin', price: 25 },
  { id: 6, name: 'Control Remoto', category: 'repuestos', price: 15 },
  { id: 7, name: 'Microondas', category: 'cocina', price: 120 },
  { id: 8, name: 'Aspersor', category: 'jardin', price: 35 },
  { id: 9, name: 'Tarjeta Madre', category: 'repuestos', price: 90 },
  { id: 10, name: 'Licuadora', category: 'cocina', price: 70 },
  { id: 11, name: 'Pala Jardín', category: 'jardin', price: 20 },
  { id: 12, name: 'Cable HDMI', category: 'repuestos', price: 10 }
];

export function Catalog() {
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontFamily: 'Geo', fontSize: '2.5rem', color: '#000', textAlign: 'center', marginBottom: '2rem' }}>
          Catálogo de Productos
        </h2>
        <div className="grid">
          {products.map((product) => (
            <div key={product.id} className="card">
              <h3>{product.name}</h3>
              <p>Categoría: {product.category}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFA500' }}>
                ${product.price}
              </p>
              <button 
                className="btn" 
                onClick={() => alert(`Tratando de contactar por ${product.name}. Enviar WhatsApp o email.`)}
              >
                Contactar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
