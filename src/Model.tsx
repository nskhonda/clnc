import { useMemo, useState, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import { Group, Vector3, Euler } from "three";

type Props = {
  url: string,
  scale: number,
  groupPosition: number[],
  rotation: number[], 
}


const Model = ({ url, scale, groupPosition, rotation }: Props) => {
  const [obj, set] = useState<Group>();
  const mesh = useRef();
  useMemo(() => new OBJLoader().load(url, set), [url]);
  const [position, setPosition] = useState([0, 0, 0]);
  
  const size = useMemo(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const center00 = box.getCenter(undefined as any);
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

  const gPos = new Vector3(groupPosition[0], groupPosition[1], groupPosition[2]);
  const rot = new Euler(rotation[0], rotation[1], rotation[2]);
  const scale0 = (scale ? scale: 20) as number;

  // rotation={rot} 
  return (obj && size) ? 
  (
    <group position={gPos} scale={ new Vector3(scale0 / size, scale0 / size, scale0 /size) }>
      <mesh ref={mesh} position={new Vector3(position[0], position[1], position[2])}>
        <primitive object={obj} />
      </mesh>
    </group>
  )
   : null;
};

export default Model;