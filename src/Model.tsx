import { Suspense, useMemo, useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import { Group, Vector3 } from "three"; // Euler
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Props = {
  order: number,
  url: string,
  scale: number,
}

const Box = () => (
  <mesh>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <meshStandardMaterial attach="material" transparent opacity={0.5} />
  </mesh>
)

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};


const Model = ({ order, url, scale }: Props) => {
  const [obj, set] = useState<Group>();
  const mesh = useRef();
  useMemo(() => new OBJLoader().load(url, set), [url]);
  const [position, setPosition] = useState([0, 0, 0]);
  
  const size = useMemo(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const maxBox = box["max"];
      const minBox = box["min"];
      const center0 = [
        (maxBox.x + minBox.x) / 2, (maxBox.y + minBox.y) / 2, (maxBox.z + minBox.z) / 2
      ];
      setPosition([
        - center0[0], - center0[1], - center0[2]
      ]);



      return Math.sqrt( Math.pow(maxBox.x, 2) + Math.pow(maxBox.y, 2) + Math.pow(maxBox.z, 2))
    } else {
      return null
    }
  }, [obj])

  const scale0 = (scale ? scale: 20) as number;
  return (obj && size) ? 
  (
    <Canvas
      className= {`canvas_${order} canvas`}
      style={{height: 400, width: 400}}
      >
      <CameraController />
      <spotLight position={[0, 0, 215]} intensity={0.2} color="white" />
      <Suspense fallback={<Box/>}>
        <group scale={ new Vector3(scale0 / size, scale0 / size, scale0 /size) }>
          <mesh ref={mesh}>
            <primitive object={obj} />
          </mesh>
        </group>
      </Suspense>
    </Canvas>
  )
   : null;
};

export default Model;