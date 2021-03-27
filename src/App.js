import "./styles.css";
import React, { useState } from "react";
import BtnViewpointList from "./BtnViewpointList";
import CanvasList from "./CanvasList";
import * as constant from "./constants";

export default function App() {
  const [current_status, setCurrent_status] = useState(constant.array_btnText[0].func);

  return (
    <div className="App">
      <BtnViewpointList activeViewpoint={current_status} setViewpoint={ (func) => setCurrent_status(func)}/>
      <CanvasList viewpoint={current_status}/>
    </div>
  );
}