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
  if (img_ext === "obj")
  {
    return (
      <Model order={order} url={url} scale={4}/>  
    );
  }
  else if (img_ext === "stl")
  {
    return (
      <STLModel order={order} url={url} scale={3} />
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



