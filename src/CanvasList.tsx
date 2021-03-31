import { useState, useEffect } from "react";
import CanvasCell from "./CanvasCell";
import * as constant from "./constants";

type Props = {
  viewpoint: string,
}

type ImageData = {
  id: number,
  img_url: string,
  img_type: string,
  date: string,
  view_point: string,
  img_ext: string
}

function CanvasList( {viewpoint}: Props ) {
  const [arrayImage, setArrayImage] = useState<ImageData[]>([]);
  const [arrayFilteredImage, setArrayFilteredImage] = useState<ImageData[]>([]);

  useEffect(() => {
    setArrayImage(constant.arrayImage);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': 'http://localhost:3000' 
                },
      body: JSON.stringify({id:1, date: "2021/03/30"})
    };

    fetch('http://silverbear3.sakura.ne.jp/public/api/', requestOptions)
      .then(response => response.json())
      .then(data => {
        setArrayImage(data)
      })
  }, []);


  useEffect(() => {
    if (arrayImage.length !== 0) {
      let tempArray = arrayImage.filter(
        item => item.view_point === viewpoint
      )

      if (viewpoint === "all") {
        tempArray = [...arrayImage];
      }

      let length = tempArray.length;
      if (length >= 6) {
        tempArray = tempArray.slice(0, 6);
      } else {
        while (length < 6) {
          tempArray.push(
            {
              ...constant.defaultImage,
              id: length,
            }
          );
          length = length + 1;
        }
      }
      
     setArrayFilteredImage(tempArray as ImageData[]);
    }
  }, [viewpoint, arrayImage]);



  let array01, array02;

  array01 = arrayFilteredImage.slice(0, 3);
  array02 = arrayFilteredImage.slice(3, 6);

  return (arrayImage !== [])? (
    <div className="canvas-list">
        <div className="canvas-row">
        {
            array01.map((item, index) => (
            <CanvasCell url={item.img_url} key={ `${index} + "th canvas"` } order={ index } viewpoint={ viewpoint } img_ext={item.img_ext}/>
            ))
        }
        </div>
        <div className="canvas-row">
        {
            array02.map((item, index) => (
            <CanvasCell url={item.img_url} key={`${index} + "th canvas"`} order={ 3 + index} viewpoint={ viewpoint } img_ext={item.img_ext}/>
            ))
        }
        </div>
    </div>
  ): null;
}

export default CanvasList;