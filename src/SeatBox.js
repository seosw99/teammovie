import { useState } from 'react';
import './style.css';

function SeatBox({seatNum, onClick, isClicked}){

    function Click() {
        onClick(seatNum);
    }

    return (
        <>
            <div onClick={Click} className={`square ${isClicked ? 'isClicked' : 'notClicked'}`}>
                {seatNum}
            </div>
        </>
    )
}

export default SeatBox