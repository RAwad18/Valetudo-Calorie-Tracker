import { useDispatch, useSelector } from 'react-redux';

import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { ConsumedCalories, TotalCalories, RemainingCalories } from '../../components/dashboard/calories';
import { Carbs, Protein, Fat } from '../../components/dashboard/macros';
import styles from './dashboard.module.css'
import { retrieveTargets } from '../../reducers/targetsReducer';
import { useEffect } from 'react';


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
    const targetData = useSelector(state => state.targets)
    // console.log(nutritionData)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(retrieveTargets());
    }, [])

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
                            <ConsumedCalories nutritionData={nutritionData}/>
                            <RemainingCalories calories={nutritionData.consumedCalories} calorieTarget={targetData.calorieGoal}/>
                        </div>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <div className={styles.ring__container}>
                            <Carbs consumed={nutritionData.netCarbs} goal={targetData.netCarbsGoal}/>
                            <Protein consumed={nutritionData.protein} goal={targetData.proteinGoal}/>
                            <Fat consumed={nutritionData.fat} goal={targetData.fatGoal}/>
                        </div>
                    </Carousel.Slide>
                </Carousel>
            </div>
        </>

    )
}

export default Dashboard;