import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useThree, ReactThreeFiber } from "react-three-fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BufferGeometry, Color } from "three"; // 
import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

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

const STLModel = ({order, url, scale }: Props) => {
  const [obj, setObj] = useState<BufferGeometry>();
  const mesh = useRef();

  useEffect(() => new STLLoader().load(url, setObj), [url]);
  
  const size = useMemo(() => {
    if (obj) {
      let radius0 = 0;
      obj.computeBoundingSphere();
      const obj1 = obj.boundingSphere;
      if (obj1) {
        radius0 = obj1.radius;
      }
      return radius0;
    } else {
      return null;
    }
  }, [obj])

  const scale0 = (scale ? scale: 80 ) as number;
  return (obj && size) ? (
    <Canvas
      className= {`canvas_${order} canvas`}
      style={{height: 400, width: 400}}
      >
      <CameraController />
      <spotLight  position={[0, 0, 40]} intensity={0.2} color="white"/>
      <ambientLight/>
      <Suspense fallback={<Box/>}>
        <group scale={ new Vector3(scale0 / size, scale0 / size, scale0 /size) }>
          <mesh ref={mesh} >
            <primitive object={obj} attach="geometry"/>
            <meshPhongMaterial color={"#444"} specular={new Color("#434343")} shininess={20}/>
          </mesh>
        </group>    
      </Suspense> 
    </Canvas>       
  ): null;
};

export default STLModel;
