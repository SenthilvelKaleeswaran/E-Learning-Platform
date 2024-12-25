import { Icon } from '@/lib/icon'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex gap-2 items-center h-8'>
        <Icon name='Logo'/>
        <p className='text-3xl font-semibold'>Edu Cat</p>
    </div>
  )
}

export default Logo