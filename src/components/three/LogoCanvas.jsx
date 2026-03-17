import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { useMemo, useRef } from 'react';
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

function ParticleField() {
  const ref = useRef();
  const particleCount = 260;

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

    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} itemSize={3} array={positions} />
      </bufferGeometry>
      <pointsMaterial color="#62f17d" size={0.018} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

function LogoModel() {
  const groupRef = useRef();
  const modelRef = useRef();
  const { size } = useThree();
  const { scene } = useGLTF('/logo3d/logoul.gltf');

  const preparedModel = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      child.material = new THREE.MeshPhysicalMaterial({
        color: '#5ef17f',
        roughness: 0.28,
        metalness: 0.9,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        reflectivity: 1,
        emissive: '#2e6f3c',
        emissiveIntensity: 0.48,
      });
      child.castShadow = true;
      child.receiveShadow = true;
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

  useFrame((state, delta) => {
    if (!groupRef.current || !modelRef.current) {
      return;
    }

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const elapsed = state.clock.getElapsedTime();
    const scrollInfluence = Math.min(window.scrollY / 800, 1);
    const isMobile = size.width < 860;
    const baseY = (isMobile ? -0.62 : -0.5) + LOGO_VERTICAL_OFFSET;

    const targetRotY = -Math.PI / 2 + pointerX * 0.4 + scrollInfluence * 0.3;
    const targetRotX = pointerY * 0.2 + Math.sin(elapsed * 0.65) * 0.08;

    modelRef.current.rotation.y = THREE.MathUtils.damp(modelRef.current.rotation.y, targetRotY, 5.4, delta);
    modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetRotX, 4.7, delta);

    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      baseY + Math.sin(elapsed * 1.35) * 0.06,
      3.8,
      delta
    );

    const targetRotZ = pointerX * 0.06;
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 4.8, delta);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.12}>
        <primitive ref={modelRef} object={preparedModel} />
      </Float>
    </group>
  );
}

export default function LogoCanvas() {
  return (
    <div
      className={styles.wrapper}
      style={{
        '--canvas-height': `${CANVAS_HEIGHT_PX}px`,
        '--canvas-ratio': CANVAS_ASPECT_RATIO,
      }}
    >
      <Canvas
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <PerspectiveCamera makeDefault position={[0, -0.08, 5.15]} fov={43} />

        <fog attach="fog" args={['#151924', 8, 16]} />

        <ambientLight intensity={0.32} />
        <directionalLight color="#62f17d" intensity={2.3} position={[2, 3, 4]} />
        <pointLight color="#42ccff" intensity={18} distance={8} position={[-2.8, 1.4, 2.2]} />
        <pointLight color="#62f17d" intensity={16} distance={10} position={[2.6, -0.5, -2.2]} />

        <ParticleField />
        <LogoModel />

        <ContactShadows opacity={0.35} scale={6.5} blur={1.5} far={4.5} resolution={512} position={[0, -2.05, 0]} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/logo3d/logoul.gltf');
