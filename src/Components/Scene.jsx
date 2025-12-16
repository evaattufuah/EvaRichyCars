import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import AnimatedCars from "./AnimatedCars";
import Smoke from "./Smoke";

import AccountCreationForm from "./AccountCreationForm";
function Scene() {
    return (
      <div className="flex w-full h-screen">
        {/* Left background (shorter) */}
        <div className="relative w-3/4 h-full">
          {/* Blue gradient background */}
          <div className="absolute inset-0 bg-black rounded-r-2xl z-0" />

          {/* White overlay */}
          <div className="absolute inset-0 w-[99%] h-[99%] bg-white  rounded-r-2xl z-10" />

          {/* Title on top */}
          <h1
            className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 
             text-center text-3xl font-extrabold tracking-tight"
          >
            <span className="font-bebas-neue bg-gradient-to-r from-yellow-500 via-yellow-600 to-black bg-clip-text text-transparent text-5xl tracking-[0.3em] uppercase drop-shadow-sm">
              EvaRichy
            </span>
            <span className="text-black ml-2 font-bold">Cars</span>
          </h1>

          {/* Car canvas ABOVE white */}
          <div className="absolute inset-0 z-20">
            <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
              <ambientLight intensity={3.5} />
              <directionalLight position={[8, 8, 8]} intensity={1} />
              <AnimatedCars />
              <Smoke /> {/* 💨 animated smoke */}
              <OrbitControls target={[0, 0, 0]} makeDefault />
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center w-2/5 bg-white">
          <AccountCreationForm />
        </div>
      </div>
    );
}


export default Scene;
