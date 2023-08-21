import { useEffect, useRef, useState, useCallback } from 'react'
import { useBeforeUnload } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { updateNutrition } from '../../reducers/nutritionReducer';
import { updateList } from '../../api/backend.js'
import { showItemData } from '../../reducers/visibilityReducer';

import styles from '../../sections/diary/diary.module.css'
import { setCurrentItem } from '../../reducers/currentItemReducer';


const DiaryContent = ({ diaryItems }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateNutrition(diaryItems))
    }, [diaryItems]);

    const [list, setList] = useState(diaryItems);


    /* Dairy Items Order */
    useBeforeUnload(
        useCallback(() => {
            updateList(list)
            console.log("useBeforeUnload")
        }, [list])
    )

    useEffect(() => {
        return () => updateList(list)
    }, [list])

    /* Drag and Drop Functionality */
    const itemBeingDragged = useRef();
    const itemBeingPassedOver = useRef();

    // Drag Functions
    const dragStart = (position) => {
        itemBeingDragged.current = position;
    }

    const dragOver = (e, position) => {
        e.preventDefault()
        itemBeingPassedOver.current = position;
    }

    const drop = (state, setState) => {
        const copyOfState = [...state]
        const dragItemContent = copyOfState[itemBeingDragged.current]
        copyOfState.splice(itemBeingDragged.current, 1);
        copyOfState.splice(itemBeingPassedOver.current, 0, dragItemContent);
        itemBeingDragged.current = null;
        itemBeingPassedOver.current = null;
        setState(copyOfState);
    }

    /* Setting Item Name */


    const onClickHandler = (event) => {
        const index = event.currentTarget.id;
        dispatch(setCurrentItem(list[index]))
        dispatch(showItemData());
    }

    /* Logos */
    const foodLogo = <svg className={styles.diary__row__logo} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g>
        <path d="M207.103,23.875v109.219c0,7-5.656,12.641-12.625,12.641h-3.375c-6.969,0-12.641-5.641-12.641-12.641V23.375 c0-18-12.109-23.375-23.719-23.375s-23.719,5.375-23.719,23.375v109.719c0,7-5.672,12.641-12.641,12.641h-3.375 c-6.969,0-12.625-5.641-12.625-12.641V23.875c0-32.219-45.938-31.125-45.938,0.359c0,37.703,0,104.297,0,104.297 c-0.219,57.906,13.625,72.953,36.469,91c18.422,14.531,34.156,22.859,34.156,58.953v232.188h55.344V278.484 c0-36.094,15.734-44.422,34.156-58.953c22.859-18.047,36.688-33.094,36.469-91c0,0,0-66.594,0-104.297 C253.04-7.25,207.103-8.344,207.103,23.875z"></path>
        <path d="M385.228,34.75c-11.75,32.953-45.578,110.156-47.719,178.344c-3.313,105.844,61.547,90.188,62.703,159.531 v138.688h55.078l0.266,0.688c0,0,0-0.281,0-0.688c0-9.266,0-119.625,0-232.203c0-111.359,0-224.797,0-244.359 C455.556-5.438,403.524-16.531,385.228,34.75z">
        </path>
    </g></g>
    </svg>;

    const activityLogo = <svg className={styles.diary__row__logo} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M278.796,94.952c26.218,0,47.472-21.254,47.472-47.481C326.268,21.254,305.014,0,278.796,0 c-26.227,0-47.481,21.254-47.481,47.472C231.315,73.698,252.569,94.952,278.796,94.952z"></path> <path class="st0" d="M407.86,236.772l-54.377-28.589l-22.92-47.087c-11.556-23.754-33.698-40.612-59.679-45.439l-23.58-4.386 c-11.859-2.197-24.111-0.614-35.027,4.542l-68.67,32.426c-7.628,3.599-13.654,9.863-16.969,17.601l-30.539,71.308 c-1.941,4.533-1.978,9.652-0.11,14.202c1.868,4.561,5.494,8.187,10.046,10.055l0.686,0.275c9.102,3.726,19.532-0.384,23.654-9.314 l28.03-60.704l44.368-14.34l-43.964,195.39l-42.82,106.765c-2.372,5.916-2.106,12.555,0.715,18.26 c2.82,5.714,7.938,9.954,14.074,11.667l1.85,0.512c9.844,2.747,20.293-1.511,25.42-10.357l50.751-87.663l30.237-59.998 l55.182,60.896l40.76,86.354c4.596,9.734,15.466,14.834,25.887,12.133l0.458-0.128c6.053-1.566,11.163-5.586,14.13-11.09 c2.94-5.504,3.47-11.996,1.438-17.903l-29.99-86.93c-4.212-12.225-10.457-23.644-18.47-33.79l-48.699-64.394l17.866-92.92 l23.058,29.294c2.848,3.626,6.538,6.52,10.741,8.426l60.658,27.388c4.387,1.979,9.387,2.098,13.864,0.33 c4.479-1.768,8.05-5.274,9.9-9.716l0.192-0.467C419.562,250.874,416.019,241.067,407.86,236.772z"></path> </g></g>
    </svg>;

    return (
        <div className={styles.diary} onDragOver={(e) => { e.preventDefault() }}>
            {list.map((item, index) =>
                <div className={styles.diary__row} onClick={onClickHandler} key={index} id={index} draggable
                    onDragStart={() => dragStart(index)}
                    onDragEnter={(e) => dragOver(e, index)}
                    onDragEnd={() => drop(list, setList)}>

                    {item.objType === 'food' ? foodLogo : activityLogo}

                    <div className={styles.diary__row__leftside}>
                        <div className={`${styles.diary__row__name} ${styles.diary__row__top}`}>{item.name}</div>

                        <div className={`${styles.diary__row__bottom} ${styles.diary__row__info}`}>{(item.amount).toFixed(1)} {item.unit}</div>
                    </div>

                    <div className={styles.diary__row__rightside}>
                        <div className={`${styles.diary__row__calories} ${styles.diary__row__top}`}>{(item.calories).toFixed(1)}</div>
                        <div className={`${styles.diary__row__bottom} ${styles.diary__row__label}`}>kcal</div>
                    </div>
                </div>)}
        </div>
    )
}

export default DiaryContent;