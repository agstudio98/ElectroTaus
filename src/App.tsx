import React, { useState } from 'react';

import { Navbar } from './components/global/navbar';
import { Footer } from './components/global/footer';
import { Home } from './components/pages/home';
import { Catalog } from './components/pages/catalog';
import { Support } from './components/pages/support';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App ErrorBoundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '2rem', textAlign: 'center', color: 'white', background: 'black'}}>
          <h2>Algo salió mal</h2>
          <p>Revisa la consola (F12) para detalles. Recarga la página.</p>
          <button onClick={() => window.location.reload()}>Recargar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentSection, setCurrentSection] = useState<'home' | 'catalog' | 'support'>('home');

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home />;
      case 'catalog':
        return <Catalog />;
      case 'support':
        return <Support />;
      default:
        return <Home />;
    }
  };

  return (
    <ErrorBoundary>
      <div>
        <Navbar onSectionChange={setCurrentSection} currentSection={currentSection} />
        <main>{renderSection()}</main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
