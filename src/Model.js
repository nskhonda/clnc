import React, { useMemo, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Model = ({ url }) => {
  const [obj, set] = useState();
  useMemo(() => new OBJLoader().load(url, set), [url]);
  return obj ? <primitive object={obj} /> : null;
};

export default Model;