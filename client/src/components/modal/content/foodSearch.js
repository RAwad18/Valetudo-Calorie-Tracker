import React from "react";
import { useSelector } from "react-redux";

const FoodSearch = () => {

    const foods = useSelector(state => state.foodList);
    console.log(foods)

    const renderCommon = () => {
        if (foods.length !== 0)
            return foods.common.map(item =>
                <div className="foodItems" key={item.name} onClick={() => console.log('clicked')}>
                    {item.name}
                </div>
            )
    }

    const renderBranded = () => {
        if (foods.length !== 0)
            return foods.branded.map(item =>
                <div className="foodItems" key={item.id}>
                    {item.name}
                </div>
            )
    }

    if(foods.length === 0)
        return(
            <div className="modal-content-empty">Search for foods using the search bar above.</div>
        )

    return (
        <div className="modal-content">
            <div className="common">Common</div>
            {renderCommon()}
            <div className="branded">Branded</div>
            {renderBranded()}
        </div>
    )
}

export default FoodSearch