import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Model from "./Model";
import STLModel from "./STLModel"
import TextureModel from "./TextureModel";
import { OrthographicCamera } from "@react-three/drei"
import * as constant from "./constants";

const Box = () => (
  <mesh>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <meshStandardMaterial attach="material" transparent opacity={0.5} />
  </mesh>
)

type Props = {
  url: string,
  order: number,
  viewpoint: string,
  img_ext: string
}

const CanvasCell = ({url, order, viewpoint, img_ext}: Props) => {
  const Const_Rotation = constant.array_Rotation[viewpoint as keyof typeof constant['array_Rotation']];
  const vRotation = [(Const_Rotation[0] * Math.PI) / 180, (Const_Rotation[1] * Math.PI) / 180, (Const_Rotation[2] * Math.PI) / 180];
  // const gPos_rotation = constant.array_gPos_rotation[viewpoint];
  // const rotation = gPos_rotation.rotation;
  // const gPos = gPos_rotation.groupPosition;
  // resize={50}

  if (img_ext === "obj")
  {
    return (
      <Canvas
        className= {`canvas_${order} canvas`}
        style={{height: 400, width: 400}}
      >
        <OrthographicCamera makeDefault position={[300, 300, 300]} zoom={10}>

            <pointLight position={[0, 0, 215]} intensity={0.2} color="white" />
            <Suspense fallback={<Box/>}>
              <Model url = {url} groupPosition={[0, 0, -10]} rotation={vRotation} scale={20}/>    
            </Suspense>
        </OrthographicCamera>
      </Canvas>
    );
  }
  else if (img_ext === "stl")
  {
    return (
      <Canvas
        className= {`canvas_${order} canvas`}
        style={{height: 400, width: 400}}
      >
        <OrthographicCamera makeDefault position={[0, 10, 0]} zoom={20}>
          <pointLight position={[10, 10, 10]} intensity={0.2} color="white" />
          <Suspense fallback={<Box/>}>
            <STLModel url = {url} groupPosition={[0, 0, -10]} rotation={vRotation} scale={120} />
          </Suspense>
        </OrthographicCamera>
      </Canvas>
    );
  }
  else 
  {
    return (
      <Canvas
        className= {`canvas_${order} canvas`}
        style={{height: 400, width: 400}}
      >
        <OrthographicCamera makeDefault position={[10, 0, 0]} zoom={20}>
          <Suspense fallback={<Box/>}>
            <TextureModel groupPosition={[0, 0, -10]} url={url} scale={20}/>
          </Suspense>
        </OrthographicCamera>
      </Canvas>
    );
  }
}

export default CanvasCell;




// const Camera = (props) => {
//   const {
//     setDefaultCamera,
//     size: { width, height }
//   } = useThree()

//   const camera = useRef()
//   const aspect = width > height ? height / width : width / height
//   const [zoom, setZoom] = useState(aspect * 50)

//   useEffect(() => {
//     void setDefaultCamera(camera.current)
//   }, [setDefaultCamera])

//   return <perspectiveCamera ref={ref} {...props} />

// }

// const Camera = (props) => {
//   const ref = useRef()
//   const { setDefaultCamera } = useThree();
//   useEffect(() => void setDefaultCamera(ref.current, []))
//   let lookAt = props.lookAt;
//   if (props.lookAt === undefined) {
//     lookAt = [0, 0, 0];
//   }
//   useFrame(() => 
//     {
//       // ref.current.lookAt(lookAt);
//       // ref.current.order = "YXZ";
//       // ref.current.lookAt(new THREE.Vector3(0, 0, 0));
//       ref.current.position.set(props.position);
//       ref.current.updateMatrixWorld();
//     }
//   )
//   return <perspectiveCamera ref={ref} {...props} />
// }




  // const cameraParam = {
  //   position: [0, 0, 75],
  //   zoom: 10,
  //   far: 220,
  //   z: 20,
  //   fov: 95
  // }
  // useFrame((state) => {
  //   const { camera } = state
  //   camera.rotation.z = -Math.PI / 4;
  // })


  // function Dolly(props) {
  //   useFrame(({camera}) => 
  //     camera.updateProjectionMatrix(
  //       void (camera.position.x = props.position[0]),
  //       (camera.position.y = props.position[1]),
  //       (camera.position.z = props.position[2]),
  //       // (camera.rotation.x = - Math.PI / 2),
  //       // (camera.rotation.z = Math.PI / 2)
  //       // (camera.rotation.order = "YZX"),
  //       // (camera.lookAt(new THREE.Vector3(props.lookAt)))
  //     )
  //   )
  
  //   return null
  // }
  