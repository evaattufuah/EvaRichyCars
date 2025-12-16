// // src/models/Car.jsx
// import React, { useRef, useEffect } from "react";
// import { useFrame } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import { animated, useSpring } from "@react-spring/three";

// function Car({ speed = 0.8, ...props }) {
//   const carRef = useRef();
//   const { nodes, materials } = useGLTF("/lamborghini_centenario_baby_blue.glb");

//   // Bounce-in scale animation
//   const spring = useSpring({
//     scale: [1.1, 1.1, 1.1],
//     config: { mass: 1.5, tension: 150, friction: 20 },
//     from: { scale: [0.1, 0.1, 0.1] },
//   });

//   useEffect(() => {
//     if (carRef.current) {
//       carRef.current.position.z = -25; 
//     }
//   }, []);

//   // Drive FORWARD toward center (increase Z)
//   useFrame((state, delta) => {
//     if (carRef.current && carRef.current.position.z < 0) {
//       carRef.current.position.z += delta * speed * 8; // Move forward

//       // Optional: slight bobbing for suspension effect
//       carRef.current.position.y = Math.sin(state.clock.elapsedTime * 5) * 0.01;
//     }
//   });
//   return (
//     <animated.group ref={carRef} {...props} dispose={null} scale={spring.scale}>
//       {/* Rotate so car faces forward */}
//       <group rotation={[-Math.PI / 2, Math.PI, 0]}>
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_2.geometry}
//           material={materials["Material.001"]}
//         />
//         <lineSegments
//           geometry={nodes.Object_3.geometry}
//           material={materials["Material.004"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_4.geometry}
//           material={materials["Material.008"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_5.geometry}
//           material={materials["Material.010"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_6.geometry}
//           material={materials["Material.018"]}
//         />
//         <lineSegments
//           geometry={nodes.Object_7.geometry}
//           material={materials["Material.016"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_8.geometry}
//           material={materials["Material.016"]}
//         />
//         <lineSegments
//           geometry={nodes.Object_9.geometry}
//           material={materials["Material.013"]}
//         />
//         <lineSegments
//           geometry={nodes.Object_10.geometry}
//           material={materials["Material.025"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_11.geometry}
//           material={materials["Lamborghini-text-logo-1440x900"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_12.geometry}
//           material={materials["Material.002"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_13.geometry}
//           material={materials["Material.002"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_14.geometry}
//           material={materials["Material.002"]}
//         />
//         <lineSegments
//           geometry={nodes.Object_15.geometry}
//           material={materials["Material.003"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_16.geometry}
//           material={materials["Material.003"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_17.geometry}
//           material={materials["Material.003"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_18.geometry}
//           material={materials["Material.004"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_19.geometry}
//           material={materials["Material.005"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_20.geometry}
//           material={materials["Material.007"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_21.geometry}
//           material={materials["Material.009"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_22.geometry}
//           material={materials["Material.011"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_23.geometry}
//           material={materials["Material.011"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_24.geometry}
//           material={materials["Material.011"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_25.geometry}
//           material={materials["Material.011"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_26.geometry}
//           material={materials["Material.012"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_27.geometry}
//           material={materials["Material.012"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_28.geometry}
//           material={materials["Material.012"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_29.geometry}
//           material={materials["Material.012"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_30.geometry}
//           material={materials["Material.012"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_31.geometry}
//           material={materials["Material.020"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_32.geometry}
//           material={materials["Material.020"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_33.geometry}
//           material={materials["Material.017"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_34.geometry}
//           material={materials["Material.013"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_35.geometry}
//           material={materials["Material.025"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_36.geometry}
//           material={materials["Material.025"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_37.geometry}
//           material={materials["Material.025"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_38.geometry}
//           material={materials["Material.025"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_39.geometry}
//           material={materials["Material.025"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_40.geometry}
//           material={materials["Material.025"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_41.geometry}
//           material={materials["Material.042"]}
//         />
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Object_42.geometry}
//           material={materials["Material.029"]}
//         />
//       </group>
//     </animated.group>
//   );
// }

// export default Car;

// // Preload model
// useGLTF.preload("/lamborghini_centenario_baby_blue.glb");
