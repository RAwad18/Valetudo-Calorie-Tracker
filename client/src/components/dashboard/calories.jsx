import { RingProgress } from '@mantine/core';
import { InnerLabel, OuterLabel } from '../../utils/labels';

import styles from './styles.module.css'

const burned = 2801;
const remaining = 480;

export const ringStyle = {
    size: 90,
    thickness: 6.8
}

export const percentCalculator = (value, total) => {
    if(total === 0)
        return ((value / 1) * 100).toFixed(2)
        
    return ((value / total) * 100).toFixed(2)
}

export const ConsumedCalories = ({ nutritionData, outerLabel = true }) => {

    const total = nutritionData.netCarbs + nutritionData.protein + nutritionData.fat;
    const carbsFillValue = percentCalculator(nutritionData.netCarbs || 0, total)
    const proteinFillValue = percentCalculator(nutritionData.protein || 0, total)
    const fatFillValue = percentCalculator(nutritionData.fat || 0, total)
    // const alcoholFillValue = percentCalculator(alcohol || 0, total)

    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: fatFillValue, color: 'var(--clr-fat)' },
                    { value: carbsFillValue, color: 'var(--clr-carbs)' },
                    { value: proteinFillValue, color: 'var(--clr-protein)' },
                ]}
                label={
                    <InnerLabel firstLn={Math.round(nutritionData.consumedCalories)} secondLn={'kcal'} />
                }
            />
            {outerLabel ? <OuterLabel value={'Consumed'} /> : null}

        </div>
    )
}

export const TotalCalories = ({ outerLabel = true }) => {
    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: 83, color: 'var(--clr-baseline)' },
                    { value: 10, color: 'var(--clr-activity)' },
                    { value: 7, color: 'var(--clr-exercise)' },
                ]}
                label={
                    <InnerLabel firstLn={burned} secondLn={'kcal'} />
                }
            />
            {outerLabel ? <OuterLabel value={'Total'} /> : null}

        </div>
    )
}

export const RemainingCalories = ({ calories = 0, calorieTarget = 1, outerLabel = true }) => {
    
    const remaining = Math.round(calorieTarget - calories) || calorieTarget;

    const fillValue = percentCalculator(calories, calorieTarget)
    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: fillValue, color: 'var(--clr-calories-consumed)' },
                ]}
                label={
                    <InnerLabel firstLn={remaining} secondLn={'kcal'} />
                }
            />
            {outerLabel ? <OuterLabel value={'Remaining'} /> : null}
        </div>
    )
};