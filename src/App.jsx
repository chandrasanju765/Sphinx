// App.jsx
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";
import * as THREE from "three";

function App() {
  const { play } = usePlay();

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
        }}
        camera={{ 
          fov: 60, 
          position: [0, 300, 500],
          near: 1,
          far: 10000 
        }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <ScrollControls pages={4} damping={0.1}>
          <Experience />
        </ScrollControls>
      </Canvas>
      <Overlay />
      
      {/* Create actual scrollable content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 0,
        height: '400vh', // 4 pages of content
        pointerEvents: 'none' 
      }}>
        {/* This div creates the scrollable space */}
      </div>
    </div>
  );
}

export default App;