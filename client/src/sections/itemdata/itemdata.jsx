import { useDispatch, useSelector } from 'react-redux';
import { hideItemData } from '../../reducers/visibilityReducer';

import ItemDataCore from '../../components/itemData/itemDataCore';

import { Carousel } from '@mantine/carousel';

import { ConsumedCalories } from '../../components/dashboard/calories';
import { Carbs, Fat, Protein } from '../../components/dashboard/macros';

import styles from './itemdata.module.css'
import Modal from '../../components/modal/modal';





const ItemData = () => {

    const visibility = useSelector(state => state.visibilitySettings.showItemData);

    const currentItem = useSelector(state => state.currentItem)

    const dispatch = useDispatch();

    const toggleVisibility = () => {
        dispatch(hideItemData())
    }

    const RenderData = () => {
        
        return (
            <>
                {visibility === '' ?
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
