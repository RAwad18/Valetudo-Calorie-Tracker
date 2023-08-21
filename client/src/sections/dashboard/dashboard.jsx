import { useSelector } from 'react-redux';

import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { ConsumedCalories, TotalCalories, RemainingCalories } from '../../components/dashboard/calories';
import { Carbs, Protein, Fat } from '../../components/dashboard/macros';
import styles from './dashboard.module.css'


const carouselStyles = createStyles(() => ({
    carousel: {
        '&:hover': {
            [`& .${getStylesRef('carouselControls')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getStylesRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    indicator: {
        width: '0.3rem',
        height: '0.3rem',
        backgroundColor: 'var(--clr-text)'
    },

    control: {
        display: 'none',
        '@media (min-width: 640px)': {
            display: 'flex',
            color: 'var(--clr-text)',
            backgroundColor: 'var(--clr-primary)',
        }
    },

    indicatorContainer: {
        bottom: '0.5em'
    }


}));

const Dashboard = () => {

    const nutritionData = useSelector(state => state.nutrition)
    // console.log(nutritionData)

    const { classes } = carouselStyles();

    return (
        <>
            <div className={`${styles.dash_container} `}>
                <Carousel
                    withIndicators
                    loop
                    classNames={{
                        root: classes.carousel,
                        control: classes.control,
                        controls: classes.carouselControls,
                        indicator: classes.indicator,
                        indicators: classes.indicatorContainer
                    }}
                >
                    <Carousel.Slide>
                        <div className={styles.ring__container}>
                            <ConsumedCalories consumed={nutritionData.consumedCalories} carbs={nutritionData.netCarbs} protein={nutritionData.protein} fat={nutritionData.fat}/>
                            <TotalCalories />
                            <RemainingCalories/>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div className={styles.ring__container}>
                            <Carbs consumed={nutritionData.netCarbs} goal={200}/>
                            <Protein consumed={nutritionData.protein} goal={100}/>
                            <Fat consumed={nutritionData.fat} goal={'N/A'}/>
                        </div>
                    </Carousel.Slide>
                </Carousel>
            </div>
        </>

    )
}

export default Dashboard;