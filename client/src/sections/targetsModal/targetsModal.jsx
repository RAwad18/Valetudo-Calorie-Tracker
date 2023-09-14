import { useDispatch, useSelector } from 'react-redux';
import { hideTargetsModal } from '../../reducers/visibilityReducer';
import Modal from '../../components/modal/modal';

import styles from './targetsModal.module.css'
import { useState } from 'react';
import { setTargets, updateTargets } from '../../reducers/targetsReducer';

const Component = ({ toggleVisibility }) => {

    const dispatch = useDispatch();

    const [calorieGoal, setCalorieGoal] = useState("");
    const [marcoGoals, setMacroGoals] = useState({
        protein: "",
        netCarbs: "",
        fat: ""
    })


    const exitLogo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>;

    const calorieInputChange = (e) => {
        const value = e.target.value;

        const re = /^[1-9\b]{1}(\d){0,3}$/;
        // const re2 = /^[0-9\b]+$/; - just for reference
        if (value === '')
            setCalorieGoal(null)
        else if (re.test(value))
            setCalorieGoal(value)
    }

    const macrosInputChange = (e, macro) => {
        const value = e.target.value;

        const re = /^[1-9\b]{1}(\d){0,2}$/;
        // const re2 = /^[0-9\b]+$/; - just for reference
        if (value === '')
            setMacroGoals({ ...marcoGoals, [macro]: null })
        else if (re.test(value))
            setMacroGoals({ ...marcoGoals, [macro]: value })
    }

    const updateTargetsLocal = () => {
        dispatch(updateTargets({
            calorieGoal: parseInt(calorieGoal) || 'N/A',
            proteinGoal: parseInt(marcoGoals.protein) || 'N/A',
            netCarbsGoal: parseInt(marcoGoals.netCarbs) || 'N/A',
            fatGoal: parseInt(marcoGoals.fat) || 'N/A',
        }))
        toggleVisibility()
    }

    return (
        <div className={styles.container}>
            <button className={styles.exit}
                onClick={toggleVisibility}
            >{exitLogo}</button>

            <div className={styles.inputs}>
                <span>Calorie Goal</span>
                <input type="text"
                    placeholder='2500'
                    value={calorieGoal}
                    onChange={(e) => calorieInputChange(e)}
                />
            </div>
            <div className={styles.inputs}>
                <span>Carb Goal</span>
                <input type="text"
                    placeholder='N/A'
                    value={marcoGoals.netCarbs}
                    onChange={(e) => macrosInputChange(e, "netCarbs")}
                />
            </div>
            <div className={styles.inputs}>
                <span>Protein Goal</span>
                <input type="text"
                    placeholder='N/A'
                    value={marcoGoals.protein}
                    onChange={(e) => macrosInputChange(e, "protein")}
                />
            </div>
            <div className={styles.inputs}>
                <span>Fat Goal</span>
                <input type="text"
                    placeholder='N/A'
                    value={marcoGoals.fat}
                    onChange={(e) => macrosInputChange(e, "fat")}
                />
            </div>

            <div className={styles.button_container}>
                <button onClick={updateTargetsLocal}>Update Targets</button>
            </div>
        </div>
    )
}

const TargetsModal = () => {
    const visibility = useSelector(state => state.visibilitySettings.showTargetsModal)

    const dispatch = useDispatch();

    const toggleVisibility = () => {
        dispatch(hideTargetsModal());
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

export default TargetsModal