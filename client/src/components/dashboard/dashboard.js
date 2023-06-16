import React from "react";
import Calories from "./dashComponents/calories";
import Macros from "./dashComponents/macros";

const Dashboard = ({ data }) => {
    return (
        <div className="dashboard">
            <Calories calories={data.calories} />
            <Macros macros={{ protein: data.protein, carbs: data.carbs, fat: data.fat }} />
        </div>
    )
}

export default Dashboard;