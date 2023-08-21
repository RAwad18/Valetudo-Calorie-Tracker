import { useDispatch, useSelector } from "react-redux"
import Modal from "../../components/modal/modal"
import { hideFoodModal, showItemData } from "../../reducers/visibilityReducer"

import nutritionixLogo from '../../assets/nixlogo.png'


import styles from './addFoodModal.module.css'
import rowStyles from '../../sections/diary/diary.module.css'
import itemDataStyles from '../../sections/itemdata/itemdata.module.css'

import { useState } from "react"
import { fetchResults } from "../../reducers/foodSearchReducer"
import { getCurrentFoodItem, setCurrentItem } from "../../reducers/currentItemReducer"
import ItemData from "../itemdata/itemdata"
import { ItemDataCalories } from "../../components/itemData/itemDataRing"

const Component = ({ toggleVisibility }) => {

    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.foodSearch)

    const [query, setQuery] = useState('');
    const [itemData, setItemData] = useState('hidden')

    const onChangeHandler = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();     //prevent refresh
        dispatch(fetchResults(query))
    }

    const onClickHandler = (event) => {
        const index = event.currentTarget.id;
        dispatch(getCurrentFoodItem(searchResults[index]))
        setItemData('')
    }

    const exitLogo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
    </svg>;

    return (
        <>
            {itemData === 'hidden' ?
                <div className={`${styles.content_container} container`}>
                    <button
                        className={styles.exit_btn}
                        onClick={toggleVisibility}
                    >{exitLogo}</button>
                    <div className={styles.search}>
                        <input className={styles.search__bar} type="text" value={query} onChange={onChangeHandler} />
                        <button className={styles.search__btn} onClick={handleSubmit}>Search</button>
                    </div>

                    <div className={styles.results}>
                        {searchResults.length > 0 ?

                            searchResults.map((item, index) =>
                                <div className={rowStyles.diary__row} key={index} id={index} onClick={onClickHandler}>
                                    <div className={rowStyles.diary__row__leftside}>
                                        <div className={`${rowStyles.diary__row__name} ${rowStyles.diary__row__top}`}>{item.food_name}</div>

                                        <div className={`${rowStyles.diary__row__bottom} ${rowStyles.diary__row__info}`}>{(item.serving_qty).toFixed(1)} {item.serving_unit}</div>
                                    </div>
                                </div>
                            )

                            :
                            <div>No Results</div>
                        }
                    </div>

                    <img className={styles.nix_logo} src={nutritionixLogo} alt='Powered by Nutritionix API' />
                </div>

                :

                <div className={`${styles.content_container} container`}>
                    <button
                        className={styles.exit_btn}
                        onClick={() => setItemData('hidden')}
                    >
                        {exitLogo}
                    </button>
                    <FoodModalItemData />
                </div>
            }
        </>

    )
}

const FoodModalItemData = () => {

    const currentItem = useSelector(state => state.currentItem)

    return (
        <div className={styles.itemData_container}>
            <div className={itemDataStyles.itemdata__item_name}>{currentItem.name}</div>

            <div className={itemDataStyles.itemdata__amount}>
                <span>Amount</span>
                <input type="text" placeholder="2" value="" />
            </div>
            <div className={itemDataStyles.itemdata__serving_size}>
                <span>Serving Size</span>
                <select>
                    <option value="volvo">extra large - 56g</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>

            <div className={itemDataStyles.carousel__calorieSlide}>
                <ItemDataCalories item={currentItem} outerLabel={false} />
                <div className={itemDataStyles.carousel__calorieSlide__macros}>
                    {currentItem.type === 'food' ?
                        <>
                            <div>
                                <span className={itemDataStyles.labelP}>{`Protein (${50}%)`}</span>
                                <span className={itemDataStyles.amount}>{` - ${currentItem.protein}g`}</span>
                            </div>
                            <div>
                                <span className={itemDataStyles.labelC}>{`Net Carbs (${40}%)`}</span>
                                <span className={itemDataStyles.amount}>{` - ${currentItem.netCarbs}g`}</span>
                            </div>
                            <div>
                                <span className={itemDataStyles.labelF}>{`Fat (${20}%)`}</span>
                                <span className={itemDataStyles.amount}>{` - ${currentItem.fat}g`}</span>
                            </div>
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

const AddFoodModal = () => {

    const visibility = useSelector(state => state.visibilitySettings.showFoodModal)

    const dispatch = useDispatch();

    const toggleVisibility = () => {
        dispatch(hideFoodModal())
    }

    return (
        <>
            {visibility === '' ?
                <Modal
                    toggleVisibility={toggleVisibility}
                    component={<Component toggleVisibility={toggleVisibility} />}
                />
                : null}
        </>

    )
}



export default AddFoodModal