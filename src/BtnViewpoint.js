import React from "react";

function BtnViewpoint ({btnText, className, ...props}) {
    let onclick = props.onclick;
    if (onclick === undefined){
        onclick = () => {console.log(`${btnText} clicked`);}
    }
    return (
        <a className={className} onClick={onclick}>
            { btnText }
        </a>
    );
}

export default BtnViewpoint;