import React from "react";


const Macros = () => {
    return (
        <div className="macroContainer">
            <div className="protein">
                <div className="value">148g</div>
                <div className="unit">100g</div>
                <div className="label">Protein</div>
            </div>
            <div className="carbs">
                <div className="value">220g</div>
                <div className="unit">No Goal</div>
                <div className="label">Carbs</div>
            </div>
            <div className="fat">
                <div className="value">80g</div>
                <div className="unit">50g</div>
                <div className="label">Fats</div>
            </div>
        </div>
    )
}

export default Macros;