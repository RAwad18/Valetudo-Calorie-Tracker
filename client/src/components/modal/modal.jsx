
import { useEffect } from 'react';
import styles from './modal.module.css'

const Modal = ({ toggleVisibility, component = null }) => {

    useEffect(() => {
        document.body.classList.add(`${styles.active_modal}`)

        return () => {
            document.body.classList.remove(`${styles.active_modal}`)
        }
    })

    const onClickHandler = (event) => {
        if (event.target !== event.currentTarget)
            return;
        toggleVisibility();
    }

    return (
        <div className={styles.modal__overlay} onClick={onClickHandler}>

                {component}

        </div>
    )
}

export default Modal;