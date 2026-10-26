'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ModelViewer.module.css';

export default function ModelViewer({ geometry, fileName }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const controlsRef = useRef(null);
  const frameRef = useRef(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!containerRef.current || !geometry) return;

    let THREE;
    let OrbitControls;
    let cleanup = false;

    async function init() {
      THREE = await import('three');
      const orbitModule = await import('three/examples/jsm/controls/OrbitControls.js');
      OrbitControls = orbitModule.OrbitControls;

      if (cleanup) return;

      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf7f6f2);
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      controls.autoRotateSpeed = 1.5;
      controls.minDistance = 10;
      controls.maxDistance = 2000;
      controlsRef.current = controls;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
      dirLight.position.set(5, 10, 7);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const backLight = new THREE.DirectionalLight(0xd5c8b8, 0.4);
      backLight.position.set(-5, 5, -5);
      scene.add(backLight);

      const fillLight = new THREE.DirectionalLight(0xc4a47c, 0.3);
      fillLight.position.set(0, -3, 5);
      scene.add(fillLight);

      const gridHelper = new THREE.GridHelper(400, 40, 0xcfccc2, 0xe5e3dc);
      scene.add(gridHelper);

      const material = new THREE.MeshStandardMaterial({
        color: 0xe4e0d6,
        roughness: 0.4,
        metalness: 0.1,
        flatShading: false,
      });

      geometry.computeVertexNormals();
      geometry.center();

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const box = new THREE.Box3().setFromObject(mesh);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      mesh.position.y = size.y / 2;
      scene.add(mesh);
      meshRef.current = mesh;

      const edgesGeo = new THREE.EdgesGeometry(geometry, 30);
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x52634f, transparent: true, opacity: 0.25 });
      const edges = new THREE.LineSegments(edgesGeo, edgesMaterial);
      edges.position.copy(mesh.position);
      scene.add(edges);

      camera.position.set(maxDim * 1.2, maxDim * 0.8, maxDim * 1.2);
      camera.lookAt(0, size.y / 2, 0);
      controls.target.set(0, size.y / 2, 0);
      controls.update();

      function animate() {
        frameRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      function handleResize() {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener('resize', handleResize);
      container._resizeHandler = handleResize;
    }

    init();

    const container = containerRef.current;
    return () => {
      cleanup = true;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        rendererRef.current.domElement.remove();
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (container?._resizeHandler) {
        window.removeEventListener('resize', container._resizeHandler);
      }
    };
  }, [geometry]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.wireframe = isWireframe;
    }
  }, [isWireframe]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  if (!geometry) {
    return (
      <div className={styles.emptyViewer}>
        <div className={styles.emptyIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <p>3D model yüklendiğinde burada görüntülenecek</p>
      </div>
    );
  }

  return (
    <div className={styles.viewerWrapper}>
      <div className={styles.viewer} ref={containerRef}></div>
      <div className={styles.controls}>
        <button
          className={`${styles.controlBtn} ${isWireframe ? styles.controlActive : ''}`}
          onClick={() => setIsWireframe(!isWireframe)}
          title="Tel kafes görünümü"
          aria-label="Tel kafes görünümü"
          aria-pressed={isWireframe}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
        </button>
        <button
          className={`${styles.controlBtn} ${autoRotate ? styles.controlActive : ''}`}
          onClick={() => setAutoRotate(!autoRotate)}
          title="Otomatik döndürme"
          aria-label="Otomatik döndürme"
          aria-pressed={autoRotate}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        </button>
      </div>
      {fileName && <div className={styles.fileLabel}>{fileName}</div>}
    </div>
  );
}
