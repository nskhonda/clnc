import { useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { Vector3 } from "three";

type Props = {
  url: string,
  scale: number,
  groupPosition: number[]
}

const TextureModel = ({ url, scale, groupPosition }: Props) => {
  const texture = useLoader(TextureLoader, url);
  const size = useMemo(() => {
    if (texture.image) {
      const width = texture.image.width;
      const height = texture.image.height;

      // return Math.sqrt( Math.pow(width, 2) + Math.pow(height, 2) );
      return height / width;
    } else {
      return null;
    }
  }, [texture]);


  const gPos = new Vector3(groupPosition[0], groupPosition[1], groupPosition[2]);
  const scale0 = (scale ? scale: 10) as number;  
  // 
  return (size) ?
  (
    <group position={gPos}> 
      <mesh>
        <planeBufferGeometry attach="geometry" args={[scale0, scale0 * size]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
    </group>
  ): null;
};

export default TextureModel;
