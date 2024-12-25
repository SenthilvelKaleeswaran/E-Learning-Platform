import { Icon } from '@/lib/icon'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex gap-2 items-center'>
        <Icon name='Logo'/>
        <p className='text-3xl font-semibold'>Edu Cat</p>
    </div>
  )
}

export default Logo