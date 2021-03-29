import React, { useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

const TextureModel = ({ url, ...props }) => {
  const texture = useLoader(TextureLoader, url);
  const size = useMemo(() => {
    if (texture.image) {
      const width = texture.image.width;
      const height = texture.image.height;
      return Math.sqrt( Math.pow(width, 2) + Math.pow(height, 2) );
    } else {
      return null;
    }
  }, [texture]);

  const scale0 = props.scale ? props.scale: 200;  
  // args={[5, 4]}
  return (
    <group position={props.groupPosition} scale={ [size / scale0, size / scale0, size / scale0] }> 
      <mesh>
        <planeBufferGeometry attach="geometry" />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    </group>
  );
};

export default TextureModel;
