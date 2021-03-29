import React, { useMemo, useState, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

const Model = ({ url, ...props }) => {
  const [obj, set] = useState();
  const mesh = useRef();
  useMemo(() => new OBJLoader().load(url, set), [url]);
  const [position, setPosition] = useState([0, 0, 0]);

  const size = useMemo(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const center00 = box.getCenter();
      const maxBox = box["max"];
      // const center0 = [
      //   (maxBox.x + minBox.x) / 2, (maxBox.y + minBox.y) / 2, (maxBox.z + minBox.z) / 2
      // ];
      setPosition([
        - center00.x, - center00.y, - center00.z
      ]);

      return Math.sqrt( Math.pow(maxBox.x, 2) + Math.pow(maxBox.y, 2) + Math.pow(maxBox.z, 2))
      // const min0 = Math.sqrt( Math.pow(minBox.x, 2) + Math.pow(minBox.y, 2) + Math.pow(minBox.z, 2))
      // const ave0 = (max0 + min0) / 2;
    } else {
      return null
    }
  }, [obj])

  const scale0 = props.scale ? props.scale: 20;

  return obj ? 
  (
    <group position={props.groupPosition} rotation={props.rotation} scale={ [scale0 / size, scale0 / size, scale0 / size] }>
      <mesh ref={mesh} position={position}>
        <primitive object={obj} />
      </mesh>
    </group>
  )
   : null;
};

export default Model;