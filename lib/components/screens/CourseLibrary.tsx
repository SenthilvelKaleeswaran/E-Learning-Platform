import React from 'react'
import { PageHeader,CourseCard } from '../shared'

export default function CourseLibrary({courses} : any) {
  return (
    <div className='h-full w-full space-y-4'>
        <PageHeader title="Course Library"/>
        <CourseCard data={courses}  />
    </div>
  )
}
