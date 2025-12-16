// Model.jsx
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Model(props) {
  const group = useRef();
  const { scene } = useGLTF("/lamborghini_centenario_baby_blue.glb");

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/lamborghini_centenario_baby_blue.glb");

export default Model;
