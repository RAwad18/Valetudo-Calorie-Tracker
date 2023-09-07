import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../reducers/diaryItemsReducer';

import ButtonBar from '../buttonBar/buttonBar'
import DiaryContent from '../../components/diary/diaryContent';
import styles from './diary.module.css'
import { updateNutrition } from '../../reducers/nutritionReducer';




const Diary = () => {

    /* Retrieve Diary Items */
    const dispatch = useDispatch();
    const date = useSelector(state => state.date.date)


    useEffect(() => {
        dispatch(fetchData(date))
    }, [date]);
    

    const diaryItems = useSelector(state => state.diaryItems);

    useEffect(() => {
        dispatch(updateNutrition(diaryItems))
    }, [diaryItems]);



    /* JSX */
    return (
        <div className={`${styles.diary__container} container`}>
            <div className={styles.button_bar}>
                <ButtonBar />
            </div>
            {diaryItems.length > 0 && <DiaryContent />}
        </div>
    )
}

export default Diary;