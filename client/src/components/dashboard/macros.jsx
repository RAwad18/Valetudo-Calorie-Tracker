import { RingProgress } from '@mantine/core';
import { InnerLabel, OuterLabel } from '../../utils/labels';

import styles from './styles.module.css'

const carbs = '200g';
const protein = '120g';
const fat = '35g';

export const Carbs = () => {
    return (
        <div className={styles.ring}>
            <RingProgress
                size={100}
                thickness={8}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: 100, color: 'var(--clr-carbs)' },
                ]}
                label={
                    <InnerLabel firstLn={carbs} secondLn={'N/A'} />
                }
            />
            <OuterLabel value={'Net Carbs'} />
        </div>
    )
}

export const Protein = () => {
    return (
        <div className={styles.ring}>
            <RingProgress
                size={100}
                thickness={8}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: 85, color: 'var(--clr-protein)' },
                ]}
                label={
                    <InnerLabel firstLn={protein} secondLn={'N/A'} />
                }
            />
            <OuterLabel value={'Protein'} />
        </div>
    )
}


export const Fat = () => {
    return (
        <div className={styles.ring}>
            <RingProgress
                size={100}
                thickness={8}
                rootColor='var(--clr-secondary)'
                sections={[
                    { value: 60, color: 'var(--clr-fat)' },
                ]}
                label={
                    <InnerLabel firstLn={fat} secondLn={'N/A'} />
                }
            />
            <OuterLabel value={'Fat'} />
        </div>
    )
}




