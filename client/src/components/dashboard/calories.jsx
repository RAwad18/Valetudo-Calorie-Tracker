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

export const ConsumedCalories = ({ consumed = 0, carbs = 0, protein = 0, fat = 0, alcohol = 0, outerLabel = true }) => {

    const total = carbs + protein + fat + alcohol;
    const carbsFillValue = percentCalculator(carbs, total)
    const proteinFillValue = percentCalculator(protein, total)
    const fatFillValue = percentCalculator(fat, total)
    const alcoholFillValue = percentCalculator(alcohol, total)

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
                    <InnerLabel firstLn={consumed} secondLn={'kcal'} />
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

export const RemainingCalories = ({ consumed = 85, total = 100, outerLabel = true }) => {
    
    const fillValue = percentCalculator(consumed, total)
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