export function Footer() {
  return (
    <footer style={{
      background: '#000',
      color: '#FFFFE0',
      padding: '2rem 0',
      textAlign: 'center',
      marginTop: '4rem'
    }}>
      <div className="container">
        <p style={{ marginBottom: '1rem', fontFamily: "'Geo', sans-serif" }}>
          <strong>ElectroTaus</strong> - Empresa de Electrodomésticos desde 1975.<br />
          Ofreciendo artículos de calidad con soporte y garantía absoluta.
        </p>
        <p style={{ fontSize: '0.9rem' }}>
          Footer completo realizado con <strong>Ag Studio 2026</strong>.
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
          © 2024 ElectroTaus. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
