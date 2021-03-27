import React, { useMemo } from "react";
import * as THREE from "three";

const Texture = ({ texture }) => {
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[5, 4]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};

const TextureModel = ({ url }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  return <Texture texture={texture} />;
};

export default TextureModel;
