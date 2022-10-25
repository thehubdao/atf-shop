/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";

// export default function Model(props: any) {
//   const { nodes, materials } = useGLTF("/images/test.glb");
//   return (
//     <group {...props} dispose={null} >
//       <group rotation={[Math.PI / 2, 0, 0]} scale={0.05}>
//         <primitive object={nodes.Avatar_Hips} />
//         <skinnedMesh
//           geometry={nodes.Mesh074.geometry}
//           material={materials.AvatarSkin_MAT}
//           skeleton={nodes.Mesh074.skeleton}
//         />
//         <skinnedMesh
//           geometry={nodes.Mesh074_1.geometry}
//           material={materials.Material}
//           skeleton={nodes.Mesh074_1.skeleton}
//         />
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/images/test.glb");

export default function Model () {
    const gltf = useLoader(GLTFLoader, "/images/test6.glb");
    return (
      <>
        <primitive object={gltf.scene} scale={2}/>
      </>
    );
  };