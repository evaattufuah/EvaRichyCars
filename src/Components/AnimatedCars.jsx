import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Cars from "../models/Cars";
import smokeImg from "../assets/Images/smoke.png";
import Smoke from "./Smoke"; // ✅ Import your Smoke component

function AnimatedCars({ onPositionChange, onRotationChange }) {
  const carRef = useRef();
  const dustRef = useRef(); // Keep dust if you still want it
  const [hasStarted, setHasStarted] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);

  // Preload smoke texture (optional, since Smoke component loads it too)
  const smokeTexture = useMemo(
    () => new THREE.TextureLoader().load(smokeImg),
    []
  );

  // Dust particles (optional — keep if you want dust trail)
  const dustCount = 80;
  const dustParticles = useMemo(() => {
    const positions = new Float32Array(dustCount * 3);
    const opacities = new Float32Array(dustCount);
    const lifetimes = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      positions.set([0, -100, 0], i * 3);
      opacities[i] = 0;
      lifetimes[i] = 0;
    }

    return { positions, opacities, lifetimes };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHasStarted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    if (!carRef.current || !hasStarted) return;

    // Move car
    if (!hasStopped) {
      carRef.current.position.x += delta * 3;
      if (carRef.current.position.x >= 2.5) {
        setHasStopped(true);
      }
    }

    // Pass position/rotation to parent (if needed)
    if (onPositionChange) {
      onPositionChange([
        carRef.current.position.x,
        carRef.current.position.y,
        carRef.current.position.z,
      ]);
    }
    if (onRotationChange) {
      onRotationChange([
        carRef.current.rotation.x,
        carRef.current.rotation.y,
        carRef.current.rotation.z,
      ]);
    }

    // Update dust particles (optional)
    if (!hasStopped) {
      for (let i = 0; i < dustCount; i++) {
        if (dustParticles.lifetimes[i] <= 0 && Math.random() > 0.97) {
          const idx = i * 3;
          dustParticles.positions[idx] = carRef.current.position.x - 1.0;
          dustParticles.positions[idx + 1] = carRef.current.position.y - 0.6;
          dustParticles.positions[idx + 2] =
            carRef.current.position.z + (Math.random() - 0.5) * 0.8;
          dustParticles.opacities[i] = 0.6;
          dustParticles.lifetimes[i] = 1.5 + Math.random();
          break;
        }
      }
    }

    // Update dust
    for (let i = 0; i < dustCount; i++) {
      if (dustParticles.lifetimes[i] > 0) {
        dustParticles.lifetimes[i] -= delta;
        dustParticles.opacities[i] = Math.max(0, dustParticles.lifetimes[i]);
        dustParticles.positions[i * 3 + 1] += delta * 0.2;
      }
    }

    // Update GPU buffer for dust (if using)
    if (dustRef.current?.geometry?.attributes?.position) {
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Car */}
      <Cars
        ref={carRef}
        position={[-5.5, 0, 1]}
        rotation={[0, Math.PI / 2, 0]} // Facing +X
        scale={1.5}
      />

      {/* ✅ Multiple Smoke Sprites — following car exhaust */}
      {hasStarted && !hasStopped && carRef.current && (
        <>
          <Smoke
            key="smoke1"
            carPosition={[
              carRef.current.position.x,
              carRef.current.position.y,
              carRef.current.position.z,
            ]}
          />
          <Smoke
            key="smoke2"
            carPosition={[
              carRef.current.position.x,
              carRef.current.position.y,
              carRef.current.position.z,
            ]}
          />
          <Smoke
            key="smoke3"
            carPosition={[
              carRef.current.position.x,
              carRef.current.position.y,
              carRef.current.position.z,
            ]}
          />
        </>
      )}

      {/* Optional: Keep dust trail if desired */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustCount}
            array={dustParticles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.NormalBlending}
          color="#c9a77c"
        />
      </points>
    </>
  );
}

export default AnimatedCars;