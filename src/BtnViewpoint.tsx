import { MouseEventHandler } from 'react'

type Props = {
    btnText: string,
    className: string,
    onclick: MouseEventHandler
}

function BtnViewpoint ({btnText, className, onclick}: Props) {
    if (onclick === undefined){
        onclick = () => {console.log(`${btnText} clicked`);}
    }
    return (
        <span className={className} onClick={onclick}>
            { btnText }
        </span>
    );
}

export default BtnViewpoint;