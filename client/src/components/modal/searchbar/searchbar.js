import React from "react";
import { useDispatch } from 'react-redux';
import { fetchList } from "../../../reducers/foodList";

const SearchBar = () => {

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchList("chicken"))
    }

    return (
        <form className="search-bar-container" onSubmit={handleSubmit}>
            <input type="text" className="search-bar" name="boomshakalaka"></input>
            <button type="submit" className="submit-btn">SEARCH</button>
        </form>
    )
}

export default SearchBar