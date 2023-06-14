import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { calorieOverflow } from './functions'
import './diary.css'
import { updateItems } from '../../api/api'
import { useBeforeUnload } from 'react-router-dom'


const Diary = ({ data }) => {
  const dispatch = useDispatch();

  // Getting Global State --- Setting Local State
  const [list, setList] = useState(data);
  // console.log(list)

  useBeforeUnload(
    updateItems(list)
  )

  // HOOKS
  useEffect(() => {
    console.log(list)
    return () => updateItems(list)
  }, [list])

  // Ref's
  const itemBeingDragged = useRef();
  const itemBeingPassedOver = useRef();

  // Drag Functions
  const dragStart = (position) => {
    itemBeingDragged.current = position;
  }

  const dragOver = (e, position) => {
    e.preventDefault()
    itemBeingPassedOver.current = position;
  }

  const drop = (state, setState) => {
    const copyOfState = [...state]
    const dragItemContent = copyOfState[itemBeingDragged.current]
    copyOfState.splice(itemBeingDragged.current, 1);
    copyOfState.splice(itemBeingPassedOver.current, 0, dragItemContent);
    itemBeingDragged.current = null;
    itemBeingPassedOver.current = null;
    setState(copyOfState);
  }

  // Render Functions
  const renderedFood = () => {
    if (list)
      return list.map((item, index) =>
        <tr key={item._id}
          className={'diaryItems'}
          draggable
          onDragStart={() => dragStart(index)}
          onDragEnter={(e) => dragOver(e, index)}
          onDragEnd={() => drop(list, setList)}
        >
          <td className='itemName'>{item.name}</td>
          <td className='itemAmt'>{item.amount}</td>
          <td className='itemUnit'>{item.unit}</td>
          <td className={`itemCal ${item.calories < 0 ? 'negCal' : ''}`}>{calorieOverflow(item.calories)} kcal.</td>
        </tr>)
  }

  return (
    <div className='diaryContainer'>
      <div className='buttonTray'>
        <button id='foodBtn'>Food</button>
        <button id='exerBtn'>Exercise</button>
        <button id='weightBtn'>Enter Weight</button>
      </div>

      <table className='diary' onDragOver={(e) => { e.preventDefault() }}>
        <tbody>
          {renderedFood()}
        </tbody>
      </table>
    </div>
  )
}


export default Diary