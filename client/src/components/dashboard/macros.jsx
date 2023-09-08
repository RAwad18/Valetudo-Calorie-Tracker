import { RingProgress } from '@mantine/core';
import { InnerLabel, OuterLabel } from '../../utils/labels';
import { ringStyle } from './calories';
// import { percentCalculator } from './calories';

import styles from './styles.module.css'

const percentCalculator = (value, total) => {
    if(total === 0)
        return ((value / 1) * 100).toFixed(2)
        
    return ((value / total) * 100).toFixed(2)
}


export const Carbs = ({ consumed = 0, goal = 1, outerLabel = true }) => {

    const fillValue = percentCalculator(consumed, goal)
    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: fillValue, color: 'var(--clr-carbs)' },
                ]}
                label={
                    <InnerLabel firstLn={`${consumed.toFixed(1)}g`} secondLn={`${goal}g`} />
                }
            />
            {outerLabel ? <OuterLabel value={'Net Carbs'} /> : null}

        </div>
    )
}

export const Protein = ({ consumed = 0, goal = 1, outerLabel = true }) => {

    const fillValue = percentCalculator(consumed, goal)

    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: fillValue, color: 'var(--clr-protein)' },
                ]}
                label={
                    <InnerLabel firstLn={`${consumed.toFixed(1)}g`} secondLn={`${goal}g`} />}
            />
            {outerLabel ? <OuterLabel value={'Protein'} /> : null}

        </div>
    )
}


export const Fat = ({ consumed = 0, goal = 1, outerLabel = true }) => {

    const fillValue = percentCalculator(consumed, goal)

    return (
        <div className={styles.ring}>
            <RingProgress
                size={ringStyle.size}
                thickness={ringStyle.thickness}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: fillValue, color: 'var(--clr-fat)' },
                ]}
                label={
                    <InnerLabel firstLn={`${consumed.toFixed(1)}g`} secondLn={`${goal}g`} />
                }
            />
            {outerLabel ? <OuterLabel value={'Fat'} /> : null}

        </div>
    )
}




