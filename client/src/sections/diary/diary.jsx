import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../reducers/diaryItemsReducer';

import ButtonBar from '../buttonBar/buttonBar'
import DiaryContent from '../../components/diary/diaryContent';
import styles from './diary.module.css'




const Diary = () => {

    /* Retrieve Diary Items */
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData('07/30/2023'))
    }, [dispatch]);

    const diaryItems = useSelector(state => state.diaryItems);

    /* JSX */
    return (
        <div className={`${styles.diary__container} container`}>
            <div className={styles.button_bar}>
                <ButtonBar />
            </div>
            {diaryItems.length > 0 && <DiaryContent diaryItems={diaryItems} />}
        </div>
    )
}

export default Diary;