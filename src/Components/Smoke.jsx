// Smoke.jsx
import React, { useRef, useEffect,useMemo,useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import smokeTexture from "../assets/Images/smoke.png";

function Smoke({ carPosition = [0, 0, 0] }) {
  const smokeRef = useRef();
  const texture = new THREE.TextureLoader().load(smokeTexture);

  // Random delay before first puff (500ms - 2s)
  const initialDelay = useMemo(() => Math.random() * 1500 + 500, []);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), initialDelay);
    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (!smokeRef.current || !isReady) return;

    // Only animate if visible
    if (smokeRef.current.material.opacity > 0) {
      // Rise
      smokeRef.current.position.y += 0.008;
      // Drift backward
      smokeRef.current.position.x -= 0.002;
      // Slight wobble
      smokeRef.current.position.z += Math.sin(Date.now() * 0.001) * 0.001;

      // Expand
      const currentScale = smokeRef.current.scale.x;
      smokeRef.current.scale.setScalar(Math.min(currentScale + 0.005, 3));

      // Fade
      smokeRef.current.material.opacity -= 0.003;
    }

    // Reset when faded or too high
    if (
      smokeRef.current.material.opacity <= 0 ||
      smokeRef.current.position.y > 4
    ) {
      // Random delay before next puff (0.3s - 1.2s)
      const nextPuffDelay = Math.random() * 900 + 300;
      setTimeout(() => {
        if (!smokeRef.current) return;

        // Randomize exhaust side slightly
        const sideOffset = (Math.random() - 0.5) * 0.6;
        smokeRef.current.position.set(
          carPosition[0] - 1.8,
          carPosition[1] - 0.4,
          carPosition[2] + sideOffset
        );

        // Randomize initial scale and opacity for variation
        const randomScale = 1.0 + Math.random() * 0.8;
        const randomOpacity = 0.3 + Math.random() * 0.4;

        smokeRef.current.scale.setScalar(randomScale);
        smokeRef.current.material.opacity = randomOpacity;
      }, nextPuffDelay);
    }
  });

  // Start offscreen and invisible
  return (
    <sprite ref={smokeRef} scale={[1.2, 1.2, 1]} position={[-100, -100, -100]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0} // 👈 Start invisible
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

export default Smoke;
