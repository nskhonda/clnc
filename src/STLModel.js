import React, { useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "react-three-fiber";

const STLModel = ({ url }) => {
  const geom = useLoader(STLLoader, url);

  const ref = useRef();

  return (
    <>
      <mesh ref={ref}>
        <primitive object={geom} attach="geometry" />
      </mesh>
    </>
  );
};

export default STLModel;