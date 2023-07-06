import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import styles from './dashboard.module.css'
import { ConsumedCalories, TotalCalories, RemainingCalories } from '../../components/dashboard/calories';
import { Carbs, Protein, Fat } from '../../components/dashboard/macros';


const Dashboard = () => {

    const useStyles = createStyles(() => ({
        indicator: {
            width: '0.3rem',
            height: '0.3rem',
            backgroundColor: 'var(--clr-text)'
        },

        control: {
            display: 'none',
        },

        indicatorContainer: {
            bottom: '0.5em'
        }


    }));

    const { classes } = useStyles();

    return (
        <>
            <div className={`${styles.mobile_dash_container}`}>
                <Carousel
                    withIndicators
                    classNames={{
                        root: classes.carousel,
                        control: classes.control,
                        indicator: classes.indicator,
                        indicators: classes.indicatorContainer
                    }}
                >
                    <Carousel.Slide>
                        <div className={styles.ring__container}>
                            <ConsumedCalories />
                            <TotalCalories />
                            <RemainingCalories />
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div className={styles.ring__container}>
                            <Carbs />
                            <Protein />
                            <Fat />
                        </div>
                    </Carousel.Slide>
                </Carousel>
            </div>
        </>

    )
}

export default Dashboard;