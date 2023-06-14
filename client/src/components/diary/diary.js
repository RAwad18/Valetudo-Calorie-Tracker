import React from 'react'

import ButtonTray from './buttonTray/buttonTray'
import DiaryTable from './diaryTable/diaryTable'
import EmptyDiary from './diaryTable/empty'

import './diary.css'


const Diary = ({ data }) => {

  return (
    <div className='diaryContainer'>
      <ButtonTray />
      {!data.length ? <EmptyDiary /> : <DiaryTable data={data}/>}
    </div>
  )
}


export default Diary