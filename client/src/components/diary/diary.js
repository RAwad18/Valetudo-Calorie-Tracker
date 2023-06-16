import React from 'react'

import ButtonTray from './buttonTray/buttonTray'
import DiaryTable from './diaryTable/diaryTable'
import EmptyDiary from './diaryTable/empty'


const Diary = ({ itemsList }) => {

  return (
    <div className='diaryContainer'>
      <ButtonTray />
      {!itemsList.length ? <EmptyDiary /> : <DiaryTable itemsList={itemsList}/>}
    </div>
  )
}


export default Diary