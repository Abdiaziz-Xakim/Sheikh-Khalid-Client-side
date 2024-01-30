"use client"

import SearchStudent from '@/app/components/fees/add/SearchStudent'
import StudentsViewLeft from '@/app/components/students/view/StudentViewLeft'
import { RootState } from '@/app/store'
import React from 'react'
import { useSelector } from 'react-redux'

const FeePage = () => {
  const store = useSelector((state: RootState) => state.students)
  const data = store.singleStudent
  return (
    <div>
      <SearchStudent/>
      {store.status === "succeeded" ? <StudentsViewLeft data={data}/> : <p>Not found!</p>}
    </div>
  )
}

export default FeePage