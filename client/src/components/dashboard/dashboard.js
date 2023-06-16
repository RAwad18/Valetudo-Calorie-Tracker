import React from "react";
import Calories from "./dashComponents/calories";
import Macros from "./dashComponents/macros";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Calories/>
            <Macros />
        </div>
    )
}

export default Dashboard;