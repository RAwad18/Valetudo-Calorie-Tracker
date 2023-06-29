import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import styles from './dashboard.module.css'
import CalorieDashComponent from '../../components/dashboard/calories';
import MacrosDashComponent from '../../components/dashboard/macros';


const Dashboard = () => {

    const useStyles = createStyles(() => ({
        indicator: {
            width: '0.4rem',
            height: '0.4rem',
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
        <div className={`${styles.mobile_dash_container} container`}>
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
                    <CalorieDashComponent />
                </Carousel.Slide>
                <Carousel.Slide>
                    <MacrosDashComponent />
                </Carousel.Slide>
            </Carousel>
        </div>
    )
}

export default Dashboard;