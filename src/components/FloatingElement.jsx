// components/FloatingElements.jsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function FloatingElements({ scroll }) {
  const elementsRef = useRef();

  useFrame((state, delta) => {
    if (elementsRef.current) {
      elementsRef.current.children.forEach((child, index) => {
        child.rotation.y += delta * (0.1 + index * 0.05);
        child.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
      });
    }
  });

  return (
    <group ref={elementsRef}>
      {/* Subtle floating geometric shapes */}
      <mesh position={[-2, 1, -1]} scale={0.4}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#8c7b73" transparent opacity={0.6} />
      </mesh>
      
      <mesh position={[2, -0.5, -2]} scale={0.3}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#a39289" transparent opacity={0.5} />
      </mesh>
      
      <mesh position={[0, 2, -3]} scale={0.5}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#7a6a63" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}