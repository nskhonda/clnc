import CanvasCell from "./CanvasCell";
import * as constant from "./constants";

function CanvasList( {viewpoint, ...props} ) {
  const array_01 = constant.array_url.slice(0, 3);
  const array_02 = constant.array_url.slice(3, 6);
  return (
    <div className="canvas-list">
        <div className="canvas-row">
        {
            array_01.map((url, index) => (
            <CanvasCell url={url} key={ index } order={ index }/>
            ))
        }
        </div>
        <div className="canvas-row">
        {
            array_02.map((url, index) => (
            <CanvasCell url={url} key={`${index} + "th canvas"`} order={ 3 + index}/>
            ))
        }
        </div>
    </div>
  );
}

export default CanvasList;