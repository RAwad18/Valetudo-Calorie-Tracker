import { RingProgress } from '@mantine/core';
import { InnerLabel, OuterLabel } from '../../utils/labels';

import styles from './styles.module.css'

const consumed = 1900;
const burned = 2801;
const remaining = 480;

export const ringStyle = {
    size : 90,
    thickness: 6
}

export const ConsumedCalories = () => {

    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: 10, color: 'var(--clr-fat)' },
                    { value: 50, color: 'var(--clr-carbs)' },
                    { value: 40, color: 'var(--clr-protein)' },
                ]}
                label={
                    <InnerLabel firstLn={consumed} secondLn={'kcal'} />
                }
            />
            <OuterLabel value={'Consumed'} />
        </div>
    )
}

export const TotalCalories = () => {
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
            <OuterLabel value={'Total'} />
        </div>
    )
}

export const RemainingCalories = () => {
    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: 85, color: 'var(--clr-calories-consumed)' },
                ]}
                label={
                    <InnerLabel firstLn={remaining} secondLn={'kcal'} />
                }
            />
            <OuterLabel value={'Remaining'} />
        </div>
    )
};