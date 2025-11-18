// components/ScrollProgress.jsx
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export function ScrollProgress({ scroll }) {
  const progressRef = useRef();

  useFrame(() => {
    if (progressRef.current && scroll) {
      const progress = scroll.offset;
      // Update DOM element directly
      const progressBar = document.querySelector('.scroll-progress');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }
    }
  });

  return null; // This component doesn't render anything in 3D space
}