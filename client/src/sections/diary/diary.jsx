import styles from './diary.module.css'

const Diary = () => {

    const list = () => {
        return (
            <div className={styles.diary__row}>

                {/* <div className={styles.diary__row__icon}>x</div> */}

                <div className={styles.diary__row__leftside}>
                    <div className={`${styles.diary__row__name} ${styles.diary__row__top}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur consequatur modi omnis libero asperiores beatae maiores officiis laudantium, numquam at nemo alias non dolores autem. Officiis architecto ratione accusamus aut?</div>

                    <div className={`${styles.diary__row__bottom} ${styles.diary__row__info}`}>sajdhasdhasdhaskdhaskdhasdhaskdhasjdhaskjdhasdasjhdkasjda</div>
                </div>

                <div className={styles.diary__row__rightside}>
                    <div className={`${styles.diary__row__calories} ${styles.diary__row__top}`}>500.0</div>
                    <div className={`${styles.diary__row__bottom} ${styles.diary__row__label}`}>kcal</div>
                </div>
            </div>)
    }

    const plus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>

    return (
        <div className={`${styles.diary__container}`}>
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            {list()}
            <div className={styles.diary__row}>

                {/* <div className={styles.diary__row__icon}>x</div> */}

                <div className={styles.diary__row__leftside}>
                    <div className={`${styles.diary__row__name} ${styles.diary__row__top}`}>I am the last item</div>

                    <div className={`${styles.diary__row__bottom} ${styles.diary__row__info}`}>final item</div>
                </div>

                <div className={styles.diary__row__rightside}>
                    <div className={`${styles.diary__row__calories} ${styles.diary__row__top}`}>500.0</div>
                    <div className={`${styles.diary__row__bottom} ${styles.diary__row__label}`}>kcal</div>
                </div>
            </div>
        </div>
    )
}

export default Diary;