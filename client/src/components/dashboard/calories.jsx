import { RingProgress } from '@mantine/core';
import { InnerLabel, OuterLabel } from '../../utils/labels';

import styles from './styles.module.css'

const CalorieDashComponent = () => {

    const consumed = 1900;
    const burned = 2801;
    const remaining = 480;

    return (
        <>
            <div className={styles.ringContainer}>
                <div className={styles.ringContainer__ring}>
                    <RingProgress
                        size={100}
                        thickness={8}
                        rootColor='var(--clr-gray900)'
                        sections={[
                            { value: 10, color: 'var(--clr-rose)' },
                            { value: 50, color: 'var(--clr-sky)' },
                            { value: 40, color: 'var(--clr-green)' },
                        ]}
                        label={
                            <InnerLabel firstLn={consumed} secondLn={'kcal'} />
                        }
                    />
                    <OuterLabel value={'Consumed'} />
                </div>

                <div className={styles.ringContainer__ring}>
                    <RingProgress
                        size={100}
                        thickness={8}
                        rootColor='var(--clr-gray900)'
                        sections={[
                            { value: 83, color: 'var(--clr-emerald)' },
                            { value: 10, color: 'var(--clr-purple)' },
                            { value: 7, color: 'var(--clr-yellow)' },
                        ]}
                        label={
                            <InnerLabel firstLn={burned} secondLn={'kcal'} />
                        }
                    />
                    <OuterLabel value={'Total'} />
                </div>
                <div className={styles.ringContainer__ring}>
                    <RingProgress
                        size={100}
                        thickness={8}
                        rootColor='var(--clr-blue)'
                        sections={[
                            { value: 85, color: 'var(--clr-orange)' },
                        ]}
                        label={
                            <InnerLabel firstLn={remaining} secondLn={'kcal'} />
                        }
                    />
                    <OuterLabel value={'Remaining'} />
                </div>
            </div>
        </>
    )
}

export default CalorieDashComponent;