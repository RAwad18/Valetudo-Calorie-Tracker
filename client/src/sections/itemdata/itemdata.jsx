import { useDispatch, useSelector } from 'react-redux';
import { hideItemData } from '../../reducers/visibilityReducer';

import ItemDataCore from '../../components/itemData/itemDataCore';

import styles from './itemdata.module.css'
import Modal from '../../components/modal/modal';





const ItemData = () => {

    const visibility = useSelector(state => state.visibilitySettings.showItemData);
    const modalVisibility = useSelector(state => state.visibilitySettings.showFoodModal);

    const currentItem = useSelector(state => state.currentItem)

    const dispatch = useDispatch();

    const toggleVisibility = () => {
        dispatch(hideItemData())
    }

    const RenderData = () => {

        return (
            <>
                {visibility === '' && modalVisibility === 'hidden' && currentItem.isEmpty === false ?
                    <div className={styles.mobile_container}>
                        <Modal component={<ItemDataCore />} toggleVisibility={toggleVisibility} />
                    </div>
                    : null}

                {visibility === '' ?
                    <div className={styles.desktop_container}>
                        <ItemDataCore />
                    </div>
                    : null}
            </>
        )
    }

    return (
        <>
            {!currentItem.isEmpty ? RenderData() : null}
        </>

    )
}

export default ItemData;
