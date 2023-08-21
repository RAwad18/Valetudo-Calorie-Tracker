import { RingProgress } from '@mantine/core';
import { InnerLabel, OuterLabel } from '../../utils/labels';

import { ringStyle, percentCalculator } from '../dashboard/calories';
import styles from '../../components/dashboard/styles.module.css'

export const ItemDataCalories = ({ item, outerLabel = true }) => {
    
    let exerciseFillValue = item.type === 'activity' ? 100 : 0;
    const {calories, protein, netCarbs, fat} = item;


    const total = netCarbs + protein + fat;
    const carbsFillValue = percentCalculator(netCarbs, total)
    const proteinFillValue = percentCalculator(protein, total)
    const fatFillValue = percentCalculator(fat, total)

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
                    {value: exerciseFillValue, color: 'var(--clr-calories-consumed)'}
                ]}
                label={
                    <InnerLabel firstLn={calories} secondLn={'kcal'} />
                }
            />
            {outerLabel ? <OuterLabel value={'Consumed'} /> : null}

        </div>
    )
}