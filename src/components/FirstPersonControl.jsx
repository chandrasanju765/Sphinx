// components/FirstPersonControls.jsx
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import * as THREE from 'three';

export const FirstPersonControls = forwardRef(({ camera, domElement }, ref) => {
  const { gl } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const canJump = useRef(false);

  const prevTime = useRef(performance.now());
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useImperativeHandle(ref, () => ({
    update: (delta) => {
      if (!controlsEnabled.current) return;

      const time = performance.now();
      
      if (prevTime.current === undefined) {
        prevTime.current = time;
      }

      const actualDelta = (time - prevTime.current) / 1000;

      velocity.current.x -= velocity.current.x * 10.0 * actualDelta;
      velocity.current.z -= velocity.current.z * 10.0 * actualDelta;

      velocity.current.y -= 9.8 * 100.0 * actualDelta; // 100.0 = mass

      direction.current.z = Number(moveForward.current) - Number(moveBackward.current);
      direction.current.x = Number(moveRight.current) - Number(moveLeft.current);
      direction.current.normalize(); // this ensures consistent movements in all directions

      if (moveForward.current || moveBackward.current) velocity.current.z -= direction.current.z * 400.0 * actualDelta;
      if (moveLeft.current || moveRight.current) velocity.current.x -= direction.current.x * 400.0 * actualDelta;

      if (canJump.current && velocity.current.y < 0) {
        velocity.current.y = 0;
      }

      // Move camera
      camera.translateX(velocity.current.x * actualDelta);
      camera.translateY(velocity.current.y * actualDelta); 
      camera.translateZ(velocity.current.z * actualDelta);

      // Keep camera above ground
      if (camera.position.y < 10) {
        velocity.current.y = 0;
        camera.position.y = 10;
        canJump.current = true;
      }

      prevTime.current = time;
    }
  }));

  const controlsEnabled = useRef(false);

  const onKeyDown = (event) => {
    if (!controlsEnabled.current) return;

    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward.current = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft.current = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward.current = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight.current = true;
        break;
      case 'Space':
        if (canJump.current === true) velocity.current.y += 350;
        canJump.current = false;
        break;
    }
  };

  const onKeyUp = (event) => {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward.current = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft.current = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward.current = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight.current = false;
        break;
    }
  };

  const onMouseDown = (event) => {
    if (document.pointerLockElement !== gl.domElement) {
      gl.domElement.requestPointerLock();
    }
    
    // Left click: forward, Right click: backward (exact behavior from Three.js example)
    if (event.button === 0) {
      moveForward.current = true;
    } else if (event.button === 2) {
      moveBackward.current = true;
    }
  };

  const onMouseUp = (event) => {
    if (event.button === 0) {
      moveForward.current = false;
    } else if (event.button === 2) {
      moveBackward.current = false;
    }
  };

  const onPointerLockChange = () => {
    controlsEnabled.current = (document.pointerLockElement === gl.domElement);
  };

  const onPointerLockError = () => {
    console.error('THREE.FirstPersonControls: Unable to use Pointer Lock API');
  };

  // Event listeners setup
  useEffect(() => {
    const dom = domElement || gl.domElement;
    
    // Add event listeners
    dom.addEventListener('keydown', onKeyDown);
    dom.addEventListener('keyup', onKeyUp);
    dom.addEventListener('mousedown', onMouseDown);
    dom.addEventListener('mouseup', onMouseUp);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('pointerlockerror', onPointerLockError);

    // Prevent context menu on right click
    dom.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    // Set initial camera position (exact from Three.js example)
    camera.position.set(100, 800, -800);
    camera.lookAt(-100, 810, -800);

    // Focus the canvas for keyboard events
    dom.tabIndex = 1;
    dom.style.outline = 'none';

    return () => {
      // Cleanup event listeners
      dom.removeEventListener('keydown', onKeyDown);
      dom.removeEventListener('keyup', onKeyUp);
      dom.removeEventListener('mousedown', onMouseDown);
      dom.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('pointerlockerror', onPointerLockError);
    };
  }, [camera, domElement, gl.domElement]);

  // Animation frame update
  useFrame((state, delta) => {
    if (controlsRef.current) {
      controlsRef.current.update(delta);
    }
  });

  const controlsRef = useRef();

  return null;
});