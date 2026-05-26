import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

export function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mounted = useRef<boolean>(false);
  useLayoutEffect(() => {
    mounted.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Geometrías flotantes
    const geoGroup = new THREE.Group();
    scene.add(geoGroup);

    const geometries = [
      new THREE.OctahedronGeometry(0.55, 0),
      new THREE.TetrahedronGeometry(0.45, 0),
      new THREE.IcosahedronGeometry(0.4, 0),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.TorusGeometry(0.38, 0.14, 8, 20),
      new THREE.ConeGeometry(0.35, 0.7, 6),
    ];

    const matYellow = new THREE.MeshStandardMaterial({
      color: 0xFFD700, metalness: 0.7, roughness: 0.2, wireframe: false,
    });
    const matOrange = new THREE.MeshStandardMaterial({
      color: 0xFFA500, metalness: 0.6, roughness: 0.3,
    });
    const matWire = new THREE.MeshStandardMaterial({
      color: 0xFFD700, metalness: 1, roughness: 0, wireframe: true,
    });

    const mats = [matYellow, matOrange, matWire, matYellow, matOrange, matWire];

    const meshes: THREE.Mesh[] = [];
    const positions = [
      [-3.2, 1.2, -1], [3.0, -1.0, -0.5], [-2.5, -1.5, -2],
      [2.8, 1.6, -1.5], [0, 2.2, -2], [0, -2.4, -1],
    ];

    geometries.forEach((geo, i) => {
      const mesh = new THREE.Mesh(geo, mats[i]);
      mesh.position.set(...(positions[i] as [number, number, number]));
      geoGroup.add(mesh);
      meshes.push(mesh);
    });

    // Partículas
    const particleGeo = new THREE.BufferGeometry();
    const count = 220;
    const positions2 = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions2[i] = (Math.random() - 0.5) * 14;
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xFFD700, size: 0.04, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // Luces
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xFFD700, 1.5);
    dirLight.position.set(3, 5, 3);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0xFFA500, 2, 12);
    pointLight.position.set(-2, 2, 3);
    scene.add(pointLight);

    let mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      if (!mounted.current) return;
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const mouseHandler = () => window.addEventListener('mousemove', onMouse);
    mouseHandler();

    let frame = 0;
    let animId: number;
    const animate = () => {
      if (!mounted.current) return;
      animId = requestAnimationFrame(animate);
      frame += 0.008;

      meshes.forEach((m, i) => {
        m.rotation.x += 0.006 + i * 0.001;
        m.rotation.y += 0.009 + i * 0.002;
        m.position.y += Math.sin(frame + i * 1.2) * 0.004;
      });

      geoGroup.rotation.y += (mouse.x * 0.12 - geoGroup.rotation.y) * 0.04;
      geoGroup.rotation.x += (-mouse.y * 0.08 - geoGroup.rotation.x) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mounted.current || !canvas) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const resizeHandler = () => window.addEventListener('resize', onResize);
    resizeHandler();

    return () => {
      mounted.current = false;
      setTimeout(() => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      }, 100);
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Canvas Three.js de fondo */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Contenido superpuesto */}
      <div className="hero-content container">
        <div className="hero-badge animate-rise">
          <span className="badge">⚡ Desde 1975</span>
        </div>

        <h1 className="logo hero-logo animate-rise delay-1" data-text="ElectroTaus">
          ElectroTaus
        </h1>

        <p className="hero-tagline animate-rise delay-2">
          Electrodomésticos de calidad, jardinería y repuestos electrónicos con{' '}
          <span className="hero-highlight">garantía absoluta</span>
        </p>

        <div className="hero-stats animate-rise delay-3">
          <div className="stat-item">
            <span className="stat-number">49+</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">12K+</span>
            <span className="stat-label">Clientes satisfechos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Categorías premium</span>
          </div>
        </div>

        <div className="hero-ctas animate-rise delay-4">
          <button className="btn btn-primary-hero">Ver Catálogo</button>
          <button className="btn btn-ghost-hero">Conocer más →</button>
        </div>

        {/* Imagen producto hero */}
        <div className="hero-img-wrap animate-rise delay-5">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
            alt="Electrodomésticos de cocina premium"
            className="hero-img"
          />
          <div className="hero-img-glow" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}