import React from "react";
import BtnViewpoint from "./BtnViewpoint"
import * as constant from "./constants";

type Props = {
    activeViewpoint: string,
    setViewpoint: (func: string) => any
}

function BtnViewpointList ({activeViewpoint, setViewpoint}: Props) {
    if (activeViewpoint === undefined) {
        activeViewpoint = constant.array_btnText[0].func;
    }
    return (
        <div className="btnViewpointList">
            {
                constant.array_btnText.map(
                    ({func, text}, index) => {
                        let className = "btnViewpoint"
                        if (func === activeViewpoint) {
                            className = "active btnViewpoint";
                        }
                        return <BtnViewpoint
                                    btnText={ text }
                                    key={`${text}_btn_${index}`}
                                    className={className}
                                    onclick={() => {
                                        setViewpoint(func);
                                    }}
                                />;
                    }
                )
            }
        </div>
    );
}

export default BtnViewpointList;