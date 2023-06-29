import styles from './labels.module.css'

export const InnerLabel = ({ firstLn, secondLn }) => {
    return (
        <div className={styles.innerLabel__container}>
            <div className={styles.innerLabel__firstLn}>{firstLn}</div>
            <div className={styles.innerLabel__secondLn}>{secondLn}</div>
        </div>
    )
}

export const OuterLabel = ({ value }) => {
    return (
        <div>{value}</div>
    )
}