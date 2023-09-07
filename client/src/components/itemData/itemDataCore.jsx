import { useDispatch, useSelector } from 'react-redux';
import { hideItemData } from '../../reducers/visibilityReducer';

import { Carousel } from '@mantine/carousel';

import { ConsumedCalories } from '../../components/dashboard/calories';
import { Carbs, Fat, Protein } from '../../components/dashboard/macros';

import styles from '../../sections/itemdata/itemdata.module.css'
import { ItemDataCalories } from './itemDataRing';

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
            <div className={styles.itemdata__item_name}>{currentItem.name}</div>

            <div className={styles.amount_container}>
                <div className={styles.itemdata__amount}>
                    <span>Amount</span>
                    <input type="text" placeholder="2" />
                </div>
                <div className={styles.itemdata__serving_size}>
                    <span>Serving Size</span>
                    <select>
                        <option value="volvo">extra large - 56g</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
            </div>


            <div className={styles.carousel__calorieSlide}>
                <ItemDataCalories item={currentItem} outerLabel={false} />
                <div className={styles.carousel__calorieSlide__macros}>
                    {currentItem.type === 'food' ?
                        <>
                            <div>
                                <span className={styles.labelP}>{`Protein (${50}%)`}</span>
                                <span className={styles.amount}>{` - ${currentItem.protein}g`}</span>
                            </div>
                            <div>
                                <span className={styles.labelC}>{`Net Carbs (${40}%)`}</span>
                                <span className={styles.amount}>{` - ${currentItem.netCarbs}g`}</span>
                            </div>
                            <div>
                                <span className={styles.labelF}>{`Fat (${20}%)`}</span>
                                <span className={styles.amount}>{` - ${currentItem.fat}g`}</span>
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

export default ItemDataCore;