import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideItemData } from '../../reducers/visibilityReducer';
import { ItemDataCalories } from './itemDataRing';

import styles from '../../sections/itemdata/itemdata.module.css'
import styles2 from '../../sections/addFoodModal/addFoodModal.module.css'
import itemDataStyles from '../../sections/itemdata/itemdata.module.css'
import { updateItem } from '../../reducers/diaryItemsReducer';


const ItemDataDisplay = () => {
    const currentItem = useSelector(state => state.currentItem)

    const [placeHolder, setPlaceHolder] = useState('')
    const [currentQuantity, setCurrentQuanity] = useState( currentItem.serving_qty || '');
    const [currentServingWeight, setCurrentServingWeight] = useState(currentItem.serving_weight_grams || '');
    const [currentServingUnit, setCurrentServingUnit] = useState(currentItem.serving_unit || '')

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

        const re = /^(\d)*(\.)?([0-9]{1,5})?$/;
        // const re2 = /^[0-9\b]+$/; - just for reference
        if (value === '')
            setCurrentQuanity(value)
        else if (value === '.')
            setCurrentQuanity('0' + value)
        else if (re.test(value))
            setCurrentQuanity(value)
    }

    const updateItemHandler = () => {
        dispatch(updateItem({
            ...currentItem,
            calories: dynamicItemData.calories,
            protein: dynamicItemData.protein,
            netCarbs: dynamicItemData.netCarbs,
            fat: dynamicItemData.fat,
            serving_qty: currentQuantity === '' ? placeHolder : currentQuantity,
            serving_unit: currentServingUnit,
            serving_weight_grams: currentServingUnit === 'g' ? 1 : currentServingWeight,

        }))
        dispatch(hideItemData())
    }

    return (
        <>
            {currentItem.isEmpty === false &&
                <>
                    <div className={styles2.itemdata__item_name}>{currentItem.name}</div>

                    <div className={styles2.itemdata__amount}>
                        <span>Amount</span>
                        <input type="text" value={currentQuantity} placeholder={placeHolder} onChange={(e) => inputChange(e)} />
                    </div>
                    <div className={styles2.itemdata__serving_size}>
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

                    <div className={styles2.button_tab}>
                        <button className={styles2.add_btn} onClick={updateItemHandler}>Update Diary</button>
                    </div>

                </>}
        </>
    )
}



const ItemDataCore = () => {

    const currentItem = useSelector(state => state.currentItem)
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(hideItemData())
    }

    return (
        <div className={`${styles.itemdata__container}`}>
            <button className={`${styles.itemdata__exit_btn}`} onClick={onClickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            <ItemDataDisplay />
        </div>
    )
}

export default ItemDataCore;