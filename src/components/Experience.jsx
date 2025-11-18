// components/Experience.jsx
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Terrain } from "./Terrain";
import * as THREE from 'three';

export function Experience() {
  const scroll = useScroll();
  const { scene, camera } = useThree();
  const groupRef = useRef();
  const terrainRef = useRef();
  const pyramidsRef = useRef();
  const particlesRef = useRef();
  const sphinxRef = useRef();

  // Set scene background and fog to match the terrain demo exactly
  useEffect(() => {
    scene.background = new THREE.Color(0xefd1b5);
    scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);
  }, [scene]);

  // Create particle system
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2000;
    positions[i * 3 + 1] = Math.random() * 500 + 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

    colors[i * 3] = Math.random() * 0.3 + 0.7; // R
    colors[i * 3 + 1] = Math.random() * 0.2 + 0.5; // G
    colors[i * 3 + 2] = Math.random() * 0.1 + 0.3; // B
  }

  useFrame((state, delta) => {
    if (!scroll) return;

    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    console.log('Scroll offset:', scrollOffset); // Debug log

    // Section 1: Overview - Camera pans over terrain (0-25%)
    if (scrollOffset < 0.25) {
      const sectionProgress = scrollOffset / 0.25;
      camera.position.x = Math.sin(time * 0.2 + sectionProgress * Math.PI) * 800;
      camera.position.y = 600 - sectionProgress * 200;
      camera.position.z = Math.cos(time * 0.2 + sectionProgress * Math.PI) * 800;
      camera.lookAt(0, 0, 0);
    }
    // Section 2: Terrain close-up with rotation (25-50%)
    else if (scrollOffset < 0.5) {
      const sectionProgress = (scrollOffset - 0.25) / 0.25;
      if (terrainRef.current) {
        terrainRef.current.rotation.y = time * 0.1 + sectionProgress * Math.PI;
        terrainRef.current.position.y = Math.sin(time * 0.5) * 20 * sectionProgress;
      }
      
      camera.position.x = Math.sin(time * 0.3) * 300 * (1 - sectionProgress);
      camera.position.y = 200 + Math.cos(time * 0.4) * 50;
      camera.position.z = 400 * (1 - sectionProgress);
      camera.lookAt(0, 100, 0);
    }
    // Section 3: Floating pyramids with particles (50-75%)
    else if (scrollOffset < 0.75) {
      const sectionProgress = (scrollOffset - 0.5) / 0.25;
      if (pyramidsRef.current) {
        pyramidsRef.current.children.forEach((pyramid, index) => {
          pyramid.rotation.y += delta * (0.5 + index * 0.2);
          pyramid.position.y = 150 + Math.sin(time * 2 + index) * (30 + sectionProgress * 50);
          pyramid.scale.setScalar(0.8 + Math.sin(time + index) * 0.2 * sectionProgress);
        });
      }

      camera.position.x = Math.sin(time * 0.2 + sectionProgress * Math.PI) * 600;
      camera.position.y = 300;
      camera.position.z = Math.cos(time * 0.2 + sectionProgress * Math.PI) * 600;
      camera.lookAt(0, 200, 0);
    }
    // Section 4: Sphinx monument (75-100%)
    else {
      const sectionProgress = (scrollOffset - 0.75) / 0.25;
      if (sphinxRef.current) {
        sphinxRef.current.rotation.y = time * 0.3 + sectionProgress * Math.PI * 2;
        sphinxRef.current.position.y = 180 + Math.sin(time * 1.5) * 40 * sectionProgress;
      }
      
      camera.position.x = Math.sin(time * 0.4) * 200;
      camera.position.y = 250 + Math.cos(time * 0.6) * 50;
      camera.position.z = Math.cos(time * 0.4) * 200;
      camera.lookAt(0, 200, 0);
    }

    // Continuous particle animation
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      particlesRef.current.position.y = Math.sin(time * 0.3) * 20;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Terrain */}
      <group ref={terrainRef}>
        <Terrain />
      </group>

      {/* Section 2: Floating Pyramids */}
      <group ref={pyramidsRef} position={[0, 150, 0]}>
        {[...Array(7)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i / 7) * Math.PI * 2) * 200,
              0,
              Math.sin((i / 7) * Math.PI * 2) * 200
            ]}
            rotation={[0, (i / 7) * Math.PI, 0]}
          >
            <coneGeometry args={[30, 60, 4]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#8B4513" : "#CD853F"}
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* Section 3: Particle System */}
      <points ref={particlesRef} position={[0, 300, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={8}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Section 4: Sphinx Monument */}
      <group ref={sphinxRef} position={[0, 180, 0]}>
        {/* Body */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[120, 60, 200]} />
          <meshStandardMaterial color="#D2B48C" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 50, 100]}>
          <sphereGeometry args={[35, 16, 16]} />
          <meshStandardMaterial color="#F5DEB3" />
        </mesh>
        {/* Wings */}
        <mesh position={[-70, 10, 0]} rotation={[0, 0, Math.PI / 3]}>
          <boxGeometry args={[15, 80, 120]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[70, 10, 0]} rotation={[0, 0, -Math.PI / 3]}>
          <boxGeometry args={[15, 80, 120]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Base */}
        <mesh position={[0, -40, 0]}>
          <boxGeometry args={[150, 20, 220]} />
          <meshStandardMaterial color="#A0522D" />
        </mesh>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#efd1b5" />
      <directionalLight
        position={[100, 200, 100]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />
      <hemisphereLight
        skyColor="#efd1b5"
        groundColor="#8B4513"
        intensity={0.5}
      />
    </group>
  );
}