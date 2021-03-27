import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Model from "./Model";
import STLModel from "./STLModel"
import TextureModel from "./TextureModel";

const Box = () => (
  <mesh>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <meshStandardMaterial attach="material" transparent opacity={0.5} />
  </mesh>
)


const CanvasCell = ({url, order}) => {
  if (url.includes(".obj"))
  {
    return (
      <Canvas
        className= {`canvas_${order} canvas`}
        camera={{ fov: 95, position: [0, 0, 75], zoom: 10, far: 220, z: 20 }}
        resize={50}
        style={{height: 400, width: 400}}
      >
        <pointLight position={[10, 10, 10]} intensity={0.2} color="white" />
        <Suspense fallback={<Box/>}>
          <Model url = {url}/>    
        </Suspense>
      </Canvas>
    );
  }
  else if (url.includes(".stl"))
  {
    return (
      <Canvas
        className= {`canvas_${order} canvas`}
        camera={{ fov: 95, position: [0, 0, 75], zoom: 10, far: 220, z: 20 }}
        resize={50}
        style={{height: 400, width: 400}}
      >
        <pointLight position={[10, 10, 10]} intensity={0.2} color="white" />
        <Suspense fallback={<Box/>}>
          <STLModel url = {url}/>
        </Suspense>
      </Canvas>
    );
  }
  else 
  {
    return (
      <Canvas
        className= {`canvas_${order} canvas`}
        camera={{ fov: 95, position: [0, 0, 75], zoom: 10, far: 220, z: 20 }}
        resize={50}
        style={{height: 400, width: 400}}
      >
        <Suspense fallback={<Box/>}>
          <TextureModel url={url} />
        </Suspense>
      </Canvas>
    );
  }
}

export default CanvasCell;