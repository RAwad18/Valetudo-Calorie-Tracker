import { useDispatch, useSelector } from "react-redux"
import Modal from "../../components/modal/modal"
import { hideFoodModal, showItemData, hideItemData } from "../../reducers/visibilityReducer"

import nutritionixLogo from '../../assets/nixlogo.png'


import styles from './addFoodModal.module.css'
import rowStyles from '../../sections/diary/diary.module.css'
import itemDataStyles from '../../sections/itemdata/itemdata.module.css'

import { useEffect, useState } from "react"
import { fetchResults } from "../../reducers/foodSearchReducer"
import { getCurrentFoodItem, setCurrentItem } from "../../reducers/currentItemReducer"
import ItemData from "../itemdata/itemdata"
import { ItemDataCalories } from "../../components/itemData/itemDataRing"
import { capitalizer } from "../../reducers/currentItemReducer"
import { addItem } from "../../reducers/diaryItemsReducer"


const Component = ({ toggleVisibility }) => {

    const dispatch = useDispatch();
    const date = useSelector(state => state.date.date)
    const searchResults = useSelector(state => state.foodSearch)
    const currentItem = useSelector(state => state.currentItem)
    const visibility = useSelector(state => state.visibilitySettings.showItemData)

    const [query, setQuery] = useState('');

    const onChangeHandler = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();     //prevent refresh
        dispatch(fetchResults(query))
    }

    const onClickHandler = (event) => {
        const index = event.currentTarget.id;
        dispatch(getCurrentFoodItem({ ...searchResults[index], date }))
        dispatch(showItemData())
    }

    const onPressEnter = (e) => {
        const key = e.key;
        if (e.key === 'Enter')
            handleSubmit(e)
    }

    const exitLogo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>;

    return (
        <>
            <div className={`${styles.content_container} container`}>
                <button
                    className={styles.exit_btn}
                    onClick={toggleVisibility}
                >{exitLogo}</button>
                <div className={styles.search} onKeyDown={(e) => onPressEnter(e)}>
                    <input className={styles.search__bar} type="text" value={query} onChange={onChangeHandler} />
                    <button className={styles.search__btn} onClick={handleSubmit}>Search</button>
                </div>

                <div className={styles.results}>
                    {searchResults.length > 0 ?

                        searchResults.map((item, index) =>
                            <div className={rowStyles.diary__row} key={index} id={index} onClick={onClickHandler}>
                                <div className={rowStyles.diary__row__leftside}>
                                    <div className={`${rowStyles.diary__row__name} ${rowStyles.diary__row__top}`}>{capitalizer(item.food_name)}</div>

                                    <div className={`${rowStyles.diary__row__bottom} ${rowStyles.diary__row__info}`}>{(item.serving_qty).toFixed(1)} {item.serving_unit}</div>
                                </div>
                            </div>
                        )

                        :
                        <div>No Results</div>
                    }
                </div>


                {visibility === '' ?
                    <div className={`${styles.itemData_container}`}>
                        <button
                            className={styles.exit_btn}
                            onClick={() => dispatch(hideItemData())}
                        >
                            {exitLogo}
                        </button>
                        <div className={styles.itemData_content_container}>
                            {currentItem.isEmpty === false && <FoodModalItemData />}
                        </div>
                    </div>
                    : null}

                <div className={styles.nix_logo}>Powered by Nutritionix API</div>
            </div>
        </>

    )
}

export const FoodModalItemData = () => {

    const currentItem = useSelector(state => state.currentItem)

    const [placeHolder, setPlaceHolder] = useState('')
    const [currentQuantity, setCurrentQuanity] = useState('');
    const [currentServingWeight, setCurrentServingWeight] = useState("");
    const [currentServingUnit, setCurrentServingUnit] = useState("")

    const dispatch = useDispatch();

    const nutrientCalculator = (nutrient) => {
        // console.log(currentItem)
        const quantityValue = currentQuantity === '' ? placeHolder : currentQuantity;
        const servingWeightValue = currentServingUnit === 'g' ? 1 : currentServingWeight

        const value = quantityValue * servingWeightValue * currentItem.perGram[nutrient]

        return parseFloat(value.toFixed(2))
    }

    const percentageCalculator = (nutrient) => {
        if (parseFloat(currentQuantity) === 0)
            return 0;
        const total = currentItem.protein + currentItem.netCarbs + currentItem.fat;
        const percentage = parseFloat(((currentItem[nutrient] / total) * 100).toFixed(1));
        return Math.round(percentage) || 0
    }


    const dynamicItemData = {
        calories: nutrientCalculator('calories'),
        protein: nutrientCalculator('protein'),
        netCarbs: nutrientCalculator('netCarbs'),
        fat: nutrientCalculator('fat'),
    }

    useEffect(() => {
        currentItem.serving_unit === 'g' ? setPlaceHolder(100) : setPlaceHolder(1)
        setCurrentServingWeight(currentItem.serving_weight_grams)
        setCurrentServingUnit(currentItem.serving_unit)
    }, [])

    useEffect(() => {
        if (currentServingUnit === 'g')
            setPlaceHolder(100)
        else
            setPlaceHolder(1)
    }, [currentServingUnit])


    const servingSizeSetter = (value) => {
        const currentServing = currentItem.alt_measures.filter((serving) => serving.serving_weight === value)
        setCurrentServingUnit(currentServing[0].measure)
    }

    const dropDownChangeHandler = (e) => {
        const value = parseFloat(e.target.value)
        setCurrentServingWeight(value);
        servingSizeSetter(value);
    }

    // For some reason, I don't need to parseFloat the 'value'
    const inputChange = (e) => {
        const value = e.target.value;
        console.log(typeof value)

        const re = /^(\d)*(\.)?([0-9]{1,5})?$/;
        // const re2 = /^[0-9\b]+$/; - just for reference
        if (value === '')
            setCurrentQuanity(value)
        else if (value === '.')
            setCurrentQuanity('0' + value)
        else if (re.test(value))
            setCurrentQuanity(value)
    }

    const addItemHandler = () => {
        dispatch(addItem({
            ...currentItem,
            calories: dynamicItemData.calories,
            protein: dynamicItemData.protein,
            netCarbs: dynamicItemData.netCarbs,
            fat: dynamicItemData.fat,
            serving_qty: currentQuantity === '' ? placeHolder : currentQuantity,
            serving_unit: currentServingUnit,
            serving_weight_grams: currentServingUnit === 'g' ? 1 : currentServingWeight,

        }))
        dispatch(hideFoodModal())
        dispatch(hideItemData())
    }

    return (
        <>
            {currentItem.isEmpty === false &&
                <>
                    <div className={styles.itemdata__item_name}>{currentItem.name}</div>

                    <div className={styles.itemdata__amount}>
                        <span>Amount</span>
                        <input type="text" value={currentQuantity} placeholder={placeHolder} onChange={(e) => inputChange(e)} />
                    </div>
                    <div className={styles.itemdata__serving_size}>
                        <span>Serving Size</span>
                        <select defaultValue={currentItem.serving_weight_grams} onChange={(e) => dropDownChangeHandler(e)}>
                            {
                                currentItem.alt_measures.map((servingSize, index) =>
                                    servingSize.measure !== 'g' ?
                                        <option key={index} value={servingSize.serving_weight}>
                                            {`${servingSize.qty > 1 ? servingSize.qty : ''} ${servingSize.measure}   -   ${servingSize.serving_weight}g`}
                                        </option>
                                        :
                                        <option key={index} value={servingSize.serving_weight}>
                                            {servingSize.measure}
                                        </option>

                                )
                            }
                        </select>
                    </div>

                    <div className={itemDataStyles.carousel__calorieSlide}>
                        <ItemDataCalories item={dynamicItemData} outerLabel={false} />
                        <div className={itemDataStyles.carousel__calorieSlide__macros}>
                            {currentItem.type === 'food' ?
                                <>
                                    <div>
                                        <span className={itemDataStyles.labelP}>{`Protein (${percentageCalculator('protein')}%)`}</span>
                                        <span className={itemDataStyles.amount}>{` - ${dynamicItemData.protein}g`}</span>
                                    </div>
                                    <div>
                                        <span className={itemDataStyles.labelC}>{`Net Carbs (${percentageCalculator('netCarbs')}%)`}</span>
                                        <span className={itemDataStyles.amount}>{` - ${dynamicItemData.netCarbs}g`}</span>
                                    </div>
                                    <div>
                                        <span className={itemDataStyles.labelF}>{`Fat (${percentageCalculator('fat')}%)`}</span>
                                        <span className={itemDataStyles.amount}>{` - ${dynamicItemData.fat}g`}</span>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </div>

                    <div className={styles.button_tab}>
                        <button className={styles.add_btn} onClick={addItemHandler}>Add to Diary</button>
                    </div>

                </>}
        </>
    )
}

const AddFoodModal = () => {

    const visibility = useSelector(state => state.visibilitySettings.showFoodModal)

    const dispatch = useDispatch();

    const toggleVisibility = () => {
        dispatch(hideFoodModal())
        dispatch(hideItemData())
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