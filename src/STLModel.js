import React, { useRef, useMemo, useState, useEffect } from "react";
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

  let xCenter = 0, yCenter = 0, zCenter = 0;  

  for(let i = 0; i < faces; i++) {
    p1.fromBufferAttribute(position, i * 3 + 0);
    p2.fromBufferAttribute(position, i * 3 + 1);
    p3.fromBufferAttribute(position, i * 3 + 2);
    const curVol = signedVolumeOfTriangle(p1, p2, p3)
    sum += curVol
    xCenter += ((p1.x + p2.x + p3.x) / 4) * curVol
    yCenter += ((p1.y + p2.y + p3.y) / 4) * curVol
    zCenter += ((p1.z + p2.z + p3.z) / 4) * curVol
  }
  console.log([xCenter, yCenter, zCenter])
  return [sum, [xCenter/sum, yCenter/sum, zCenter/sum]];
}

function signedVolumeOfTriangle(p1, p2, p3) {
  return p1.dot(p2.cross(p3)) / 6.0;
}


const STLModel = ({ url, ...props }) => {
  const [obj, setObj] = useState();
  const [position, setPosition] = useState([0, 0, 0]);
  const mesh = useRef();
  // const obj = useLoader(STLLoader, url);

  useEffect(() => new STLLoader().load(url, setObj), [url]);
  
  const size = useMemo(() => {
    if (obj) {
      const [volume, center0] = getVolume(obj);
      console.log(center0)
      setPosition([-center0[0], -center0[1], 0])
      console.log(Math.pow(Math.abs(volume), 1/3))
      return Math.pow(Math.abs(volume), 1/3);
    } else {
      return null;
    }
  }, [obj])

  const scale0 = props.scale ? props.scale: 80;
//position={[0, 0, 0]}
  return obj ? (
    <group position={props.groupPosition} rotation={props.rotation} scale={ [scale0 / size, scale0 / size, scale0 / size] }>
      <mesh ref={mesh}>
        <primitive object={obj} attach="geometry"/>
      </mesh>
    </group>    
  ): null;
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
