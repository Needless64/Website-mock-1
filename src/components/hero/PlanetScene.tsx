'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { planetVertexShader, atmosphereFragmentShader, coreFragmentShader } from './planet-shaders';

const RADIUS = 3.2;

function buildWireGeometry(radius: number) {
  const positions: number[] = [];
  const latBands = 14;
  const lonBands = 28;
  const segments = 96;

  // Latitude rings
  for (let i = 1; i < latBands; i += 1) {
    const phi = (Math.PI * i) / latBands;
    const y = Math.cos(phi) * radius;
    const r = Math.sin(phi) * radius;
    for (let j = 0; j < segments; j += 1) {
      const a1 = (j / segments) * Math.PI * 2;
      const a2 = ((j + 1) / segments) * Math.PI * 2;
      positions.push(Math.cos(a1) * r, y, Math.sin(a1) * r, Math.cos(a2) * r, y, Math.sin(a2) * r);
    }
  }

  // Longitude meridians
  const lonSegments = 48;
  for (let i = 0; i < lonBands; i += 1) {
    const theta = (i / lonBands) * Math.PI * 2;
    for (let j = 0; j < lonSegments; j += 1) {
      const p1 = (Math.PI * j) / lonSegments;
      const p2 = (Math.PI * (j + 1)) / lonSegments;
      positions.push(
        Math.sin(p1) * Math.cos(theta) * radius,
        Math.cos(p1) * radius,
        Math.sin(p1) * Math.sin(theta) * radius,
        Math.sin(p2) * Math.cos(theta) * radius,
        Math.cos(p2) * radius,
        Math.sin(p2) * Math.sin(theta) * radius
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

function buildRing(radius: number, color: number, opacity: number) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(220).map((p) => new THREE.Vector3(p.x, 0, p.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  return new THREE.LineLoop(geometry, material);
}

function buildStars(count: number, inner: number, outer: number, size: number, color: number, opacity: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = inner + Math.pow(Math.random(), 1.7) * (outer - inner);
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.cos(phi) * r;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    size,
    color,
    transparent: true,
    opacity,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  return new THREE.Points(geometry, material);
}

export default function PlanetScene({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setFailed(true);
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    camera.position.set(0, 0.1, 8);
    camera.lookAt(0, 0.15, 0);

    const planet = new THREE.Group();
    planet.position.set(0, -3.05, 0);
    scene.add(planet);

    const disposables: Array<{ dispose: () => void }> = [];

    // Solid dark core — hides back-facing wireframe and gives the horizon a body.
    const coreGeometry = new THREE.SphereGeometry(RADIUS * 0.992, 64, 48);
    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader: planetVertexShader,
      fragmentShader: coreFragmentShader,
      uniforms: {
        uTop: { value: new THREE.Color('#1c0a2e') },
        uBottom: { value: new THREE.Color('#08080b') },
        uRim: { value: new THREE.Color('#ff2b7a') }
      }
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    planet.add(core);
    disposables.push(coreGeometry, coreMaterial);

    // Wireframe latitude + longitude
    const wireGeometry = buildWireGeometry(RADIUS * 1.001);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0xc9a8e8,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const wire = new THREE.LineSegments(wireGeometry, wireMaterial);
    planet.add(wire);
    disposables.push(wireGeometry, wireMaterial);

    // Three highlighted meridians in pink
    const hotMaterial = new THREE.LineBasicMaterial({
      color: 0xff2f7d,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    disposables.push(hotMaterial);
    [0.4, 2.4, 4.5].forEach((theta) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 96; i += 1) {
        const phi = (Math.PI * i) / 96;
        points.push(
          new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta) * RADIUS * 1.004,
            Math.cos(phi) * RADIUS * 1.004,
            Math.sin(phi) * Math.sin(theta) * RADIUS * 1.004
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, hotMaterial);
      planet.add(line);
      disposables.push(geometry);
    });

    // Atmospheric rim (rendered from inside a slightly larger shell)
    const atmosphereGeometry = new THREE.SphereGeometry(RADIUS * 1.16, 64, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: planetVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uPink: { value: new THREE.Color('#ff0259') },
        uViolet: { value: new THREE.Color('#5a2bff') },
        uBoost: { value: 1 }
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    planet.add(atmosphere);
    disposables.push(atmosphereGeometry, atmosphereMaterial);

    // Orbital rings
    const ringGroup = new THREE.Group();
    const ringA = buildRing(RADIUS * 1.28, 0xff2f7d, 0.6);
    const ringB = buildRing(RADIUS * 1.52, 0x7d5cff, 0.32);
    const ringC = buildRing(RADIUS * 1.76, 0xff0259, 0.16);
    ringA.rotation.set(1.42, 0, 0.2);
    ringB.rotation.set(1.48, 0, -0.28);
    ringC.rotation.set(1.36, 0, 0.55);
    ringGroup.add(ringA, ringB, ringC);
    planet.add(ringGroup);
    [ringA, ringB, ringC].forEach((ring) => disposables.push(ring.geometry, ring.material as THREE.Material));

    // Particles: sparse, depth-aware
    const starCount = isMobile ? 150 : 520;
    const stars = buildStars(starCount, RADIUS * 1.45, 10, isMobile ? 0.055 : 0.045, 0xf8f7fc, 0.55);
    const sparks = buildStars(Math.round(starCount * 0.18), RADIUS * 1.35, 6.5, 0.06, 0xff4d94, 0.75);
    planet.add(stars, sparks);
    disposables.push(stars.geometry, stars.material, sparks.geometry, sparks.material);

    let width = container.clientWidth;
    let height = container.clientHeight;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let visible = true;
    let raf = 0;
    let disposed = false;
    const clock = new THREE.Clock();
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let scrollProgress = 0;
    let elapsed = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));
    };

    if (!reduced && finePointer) window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const baseTilt = 0.15;
    const atmosphereBoost = atmosphereMaterial.uniforms.uBoost;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      elapsed += delta;

      eased.x += (pointer.x - eased.x) * 0.045;
      eased.y += (pointer.y - eased.y) * 0.045;

      planet.rotation.y += delta * (0.045 + scrollProgress * 0.22);
      ringGroup.rotation.z = Math.sin(elapsed * 0.12) * 0.035 + scrollProgress * 0.35;
      ringGroup.rotation.y = scrollProgress * 0.45;

      stars.scale.setScalar(1 + scrollProgress * 0.55);
      sparks.scale.setScalar(1 + scrollProgress * 0.85);
      stars.rotation.y -= delta * 0.012;
      sparks.rotation.y += delta * 0.018;
      atmosphereBoost.value = 1 + scrollProgress * 1.4;

      camera.position.z += (8 - scrollProgress * 1.15 - camera.position.z) * 0.08;
      camera.position.x = eased.x * 0.38;
      camera.position.y = 0.1 - eased.y * 0.22 + scrollProgress * 0.55;
      camera.lookAt(0, baseTilt + scrollProgress * 0.35, 0);

      planet.position.y = -3.05 - scrollProgress * 0.3;
      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(animate);
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    visibilityObserver.observe(container);

    const onVisibility = () => {
      if (document.hidden) clock.stop();
      else clock.start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const rafIdle = window.setTimeout(() => {
      if (!disposed) onReady?.();
    }, 260);

    return () => {
      disposed = true;
      window.clearTimeout(rafIdle);
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, [onReady]);

  if (failed) return null;

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
