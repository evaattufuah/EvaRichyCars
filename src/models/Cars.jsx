// Model.jsx
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Cars(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/lamborghini_centenario.glb");

  return (
    <group
      ref={group}
      {...props} // This will now properly use the props from App.jsx
      dispose={null}
    >
      {/* Load full scene */}
      <primitive object={nodes.Sketchfab_Scene || nodes.root} />
    </group>
  );
}

export default Cars;
useGLTF.preload("/lamborghini_centenario.glb");
