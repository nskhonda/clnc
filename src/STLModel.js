import React, { useRef, useMemo, useState } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

function getVolume(geometry) {
  let position = geometry.attributes.position;
  let faces = position.count / 3;
  let sum = 0;
  let p1 = new THREE.Vector3(),
      p2 = new THREE.Vector3(),
      p3 = new THREE.Vector3();

  for(let i = 0; i < faces; i++) {
    p1.fromBufferAttribute(position, i * 3 + 0);
    p2.fromBufferAttribute(position, i * 3 + 1);
    p3.fromBufferAttribute(position, i * 3 + 2);
    sum += signedVolumeOfTriangle(p1, p2, p3)
  }
  return sum;
}

function signedVolumeOfTriangle(p1, p2, p3) {
  return p1.dot(p2.cross(p3)) / 6.0;
}


const STLModel = ({ url, ...props }) => {
  const mesh = useRef();

  // useMemo(() => {
  //   let loader = new STLLoader();
  //   const obj0 = loader.load(url, function(geometry) {
  //   console.log("stl volume is " + getVolume(geometry));
  //   set(geometry)
  //   })

  // }, [url])

  const obj = useLoader(STLLoader, url);

  

  // const scale0 = props.scale ? props.scale: 20;
  // scale={ [scale0 / size, scale0 / size, scale0 / size] }

  return (
    <group position={props.groupPosition} rotation={props.rotation}>
      <mesh ref={mesh} position={props.position}>
        <primitive object={obj} attach="geometry"/>
      </mesh>
    </group>    
  );
};

export default STLModel;


  // const size = useMemo(() => {
  //   if (obj) {
  //     const box = new THREE.Box3().setFromObject(obj);
  //     const maxBox = box["max"]
  //     return Math.sqrt( Math.pow(maxBox.x, 2) + Math.pow(maxBox.y, 2) + Math.pow(maxBox.z, 2) )
  //   } else {
  //     return null
  //   }
  // }, [obj])
