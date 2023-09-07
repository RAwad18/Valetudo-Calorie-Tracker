import { useDispatch } from 'react-redux'
import styles from './buttonBar.module.css'
import { showFoodModal } from '../../reducers/visibilityReducer';

const plus = (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
</svg>
)



const ButtonBar = () => {

    const dispatch = useDispatch();
    
    
    const onClickHandler = () => {
        dispatch(showFoodModal());  
    }
    
    return (
        <div className={styles.button_bar__container}>
            <button
                onClick={onClickHandler}
            >{plus}Food</button>
            {/* <button>{plus}Exercise</button>
            <button>{plus}Weight</button> */}
        </div>
    )
}

export default ButtonBar;