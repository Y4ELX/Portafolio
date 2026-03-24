import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './LogoCanvas.module.css';

const CANVAS_HEIGHT_PX = 450;
const CANVAS_ASPECT_RATIO = 16 / 9;
// Ajusta este valor para subir/bajar el logo:
// negativo = baja, positivo = sube.
const LOGO_VERTICAL_OFFSET = 0;
// Ajusta tamano global del logo:
// 1 = normal, 1.2 = mas grande, 0.9 = mas pequeno.
const LOGO_SIZE_MULTIPLIER = 0.9;
const MOBILE_BREAKPOINT = 860;
const DESKTOP_PARTICLES = 160;
const MOBILE_PARTICLES = 64;

function supportsMediaQuery(query) {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => supportsMediaQuery(query));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [query]);

  return matches;
}

function ParticleField({ lowPower }) {
  const ref = useRef();
  const particleCount = lowPower ? MOBILE_PARTICLES : DESKTOP_PARTICLES;

  const positions = useMemo(() => {
    const data = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.2;
      data[i * 3] = Math.cos(theta) * radius;
      data[i * 3 + 1] = y;
      data[i * 3 + 2] = Math.sin(theta) * radius;
    }

    return data;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} itemSize={3} array={positions} />
      </bufferGeometry>
      <pointsMaterial color="#62f17d" size={0.016} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

function LogoModel({ lowPower, reducedMotion }) {
  const groupRef = useRef();
  const modelRef = useRef();
  const scrollInfluenceRef = useRef(0);
  const { size } = useThree();
  const { scene } = useGLTF('/logo3d/logoul.gltf');

  const preparedModel = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      child.material = new THREE.MeshStandardMaterial({
        color: '#5ef17f',
        roughness: 0.35,
        metalness: 0.82,
        emissive: '#2e6f3c',
        emissiveIntensity: 0.42,
      });
    });

    // Normalize model bounds so it stays centered and consistently framed.
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const modelSize = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(modelSize.x, modelSize.y, modelSize.z) || 1;
    const targetSize = (size.width < 860 ? 3.45 : 4.05) * LOGO_SIZE_MULTIPLIER;
    const normalizedScale = targetSize / maxDimension;

    cloned.position.sub(center);
    cloned.scale.setScalar(normalizedScale);

    return cloned;
  }, [scene, size.width]);

  useEffect(() => {
    if (reducedMotion) {
      scrollInfluenceRef.current = 0;
      return undefined;
    }

    let rafId = null;
    let latestY = window.scrollY;

    const updateScrollInfluence = () => {
      rafId = null;
      scrollInfluenceRef.current = Math.min(latestY / 800, 1);
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(updateScrollInfluence);
    };

    updateScrollInfluence();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [reducedMotion]);

  useFrame((state, delta) => {
    if (!groupRef.current || !modelRef.current) {
      return;
    }

    if (reducedMotion) {
      modelRef.current.rotation.y = -Math.PI / 2;
      modelRef.current.rotation.x = 0;
      groupRef.current.position.y = (size.width < MOBILE_BREAKPOINT ? -0.62 : -0.5) + LOGO_VERTICAL_OFFSET;
      groupRef.current.rotation.z = 0;
      return;
    }

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const elapsed = state.clock.getElapsedTime();
    const scrollInfluence = scrollInfluenceRef.current;
    const isMobile = size.width < MOBILE_BREAKPOINT;
    const baseY = (isMobile ? -0.62 : -0.5) + LOGO_VERTICAL_OFFSET;

    const pointerInfluence = lowPower ? 0.3 : 0.4;
    const targetRotY = -Math.PI / 2 + pointerX * pointerInfluence + scrollInfluence * 0.22;
    const targetRotX = pointerY * 0.17 + Math.sin(elapsed * 0.65) * 0.06;

    modelRef.current.rotation.y = THREE.MathUtils.damp(modelRef.current.rotation.y, targetRotY, 4.8, delta);
    modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetRotX, 4.3, delta);

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      baseY + Math.sin(elapsed * 1.22) * 0.045,
      3.4,
      delta
    );

    const targetRotZ = pointerX * 0.045;
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 4.2, delta);
  });

  return (
    <group ref={groupRef}>
      <primitive ref={modelRef} object={preparedModel} />

      <mesh position={[0, -1.96, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.35, 40]} />
        <meshBasicMaterial color="#09101a" transparent opacity={0.36} />
      </mesh>
    </group>
  );
}

export default function LogoCanvas() {
  const wrapperRef = useRef(null);
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [isInView, setIsInView] = useState(true);
  const lowPower = isMobile || reducedMotion;
  const canvasHeight = isMobile ? 320 : CANVAS_HEIGHT_PX;
  const canvasAspectRatio = isMobile ? 1.2 : CANVAS_ASPECT_RATIO;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function' || !wrapperRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '220px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const frameLoopMode = reducedMotion ? 'demand' : isInView ? 'always' : 'never';

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{
        '--canvas-height': `${canvasHeight}px`,
        '--canvas-ratio': canvasAspectRatio,
      }}
    >
      <Canvas
        frameloop={frameLoopMode}
        resize={{ scroll: false, debounce: { resize: 120 } }}
        dpr={lowPower ? [1, 1.1] : [1, 1.45]}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: lowPower ? 'default' : 'high-performance' }}
      >
        <PerspectiveCamera makeDefault position={[0, -0.08, 5.15]} fov={43} />

        <fog attach="fog" args={['#151924', 8, 16]} />

        <ambientLight intensity={0.36} />
        <directionalLight color="#62f17d" intensity={1.8} position={[2, 3, 4]} />
        <pointLight color="#42ccff" intensity={10} distance={7} position={[-2.8, 1.4, 2.2]} />
        <pointLight color="#62f17d" intensity={9} distance={8.5} position={[2.6, -0.5, -2.2]} />

        <ParticleField lowPower={lowPower} />
        <LogoModel lowPower={lowPower} reducedMotion={reducedMotion} />

        {!lowPower && <Environment preset="city" />}
      </Canvas>
    </div>
  );
}

useGLTF.preload('/logo3d/logoul.gltf');
