import { RingProgress } from '@mantine/core';
import { InnerLabel, OuterLabel } from '../../utils/labels';

import styles from './styles.module.css'

const MacrosDashComponent = () => {

    const carbs = '200g';
    const protein = '120g';
    const fat = '35g';

    return (
        <>
            <div className={styles.ringContainer}>
                <div className={styles.ringContainer__ring}>
                    <RingProgress
                        size={100}
                        thickness={8}
                        rootColor='var(--clr-gray900)'
                        sections={[
                            { value: 100, color: 'blue' },
                        ]}
                        label={
                            <InnerLabel firstLn={carbs} secondLn={'N/A'}/>
                        }
                    />
                    <OuterLabel value={'Net Carbs'} />
                </div>

                <div className={styles.ringContainer__ring}>
                    <RingProgress
                        size={100}
                        thickness={8}
                        rootColor='var(--clr-gray900)'
                        sections={[
                            { value: 85, color: 'green' },
                        ]}
                        label={
                            <InnerLabel firstLn={protein} secondLn={'N/A'}/>
                        }
                    />
                    <OuterLabel value={'Protein'} />
                </div>
                <div className={styles.ringContainer__ring}>
                    <RingProgress
                        size={100}
                        thickness={8}
                        rootColor='var(--clr-gray900)'
                        sections={[
                            { value: 60, color: 'red' },
                        ]}
                        label={
                            <InnerLabel firstLn={fat} secondLn={'N/A'}/>
                        }
                    />
                    <OuterLabel value={'Fat'} />
                </div>
            </div>
        </>
    )
}

export default MacrosDashComponent;