import React from "react";


const Calories = () => {
    return (
        <div className="calorieContainer">
            <div className="consumed">
                <div className="value">2000</div>
                <div className="unit">kcal</div>
                <div className="label">Consumed</div>
            </div>
            <div className="burned">
                <div className="value">3000</div>
                <div className="unit">kcal</div>
                <div className="label">Burned</div>
            </div>
            <div className="remaining">
                <div className="value">500</div>
                <div className="unit">kcal</div>
                <div className="label">Remaining</div>
            </div>
        </div>
    )
}

export default Calories;