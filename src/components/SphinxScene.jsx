// components/SphinxScene.jsx
import { useGLTF, Text, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function SphinxScene({ scroll }) {
  const sphinxRef = useRef();
  const textRef = useRef();

  useFrame((state, delta) => {
    if (sphinxRef.current) {
      sphinxRef.current.rotation.y += delta * 0.1;
      sphinxRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime + 1) * 0.05;
    }
  });

  return (
    <group>
      {/* Sphinx Model */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphinxRef} position={[0, 0, 0]} scale={2}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#f0a500" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      {/* SPHINX CODE Text */}
      <Text
        ref={textRef}
        font="./fonts/Inter-Bold.woff"
        fontSize={0.8}
        color="#ffffff"
        position={[0, -1.5, 0]}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        SPHINX CODE
      </Text>

      {/* Subtitle */}
      <Text
        font="./fonts/Inter-Regular.woff"
        fontSize={0.3}
        color="#cccccc"
        position={[0, -2.2, 0]}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        AWAKEN YOUR MAGIC & GENIUS
      </Text>
    </group>
  );
}