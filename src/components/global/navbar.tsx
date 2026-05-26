import { useState } from 'react';

interface NavbarProps {
  onSectionChange: (section: 'home' | 'catalog' | 'support') => void;
  currentSection: 'home' | 'catalog' | 'support';
}

export function Navbar({ onSectionChange, currentSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { id: 'home' | 'catalog' | 'support'; label: string }[] = [
    { id: 'home',    label: 'Inicio'   },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'support', label: 'Soporte'  },
  ];

  const handleNav = (id: 'home' | 'catalog' | 'support') => {
    onSectionChange(id);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">

        {/* Brand */}
        <a
          href="#"
          className="navbar-brand"
          onClick={(e) => { e.preventDefault(); handleNav('home'); }}
        >
          <span className="navbar-brand-dot" />
          ElectroTaus
        </a>

        {/* Hamburguesa animada */}
        <button
          className={`nav-toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <ul className={`navbar-nav${menuOpen ? ' open' : ''}`}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href="#"
                className={`nav-link${currentSection === id ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(id); }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
}