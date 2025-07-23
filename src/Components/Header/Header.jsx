import React, { useState } from 'react'
import style from './Header.module.css'

export default function Header() {



    
  return <>
    <div className="w-full p-8 mx-auto flex flex-col space-y-4 justify-center items-center bg-blue-500 text-white text-center">
      <h1 className='text-5xl font-bold uppercase'>FCAI GPA+</h1>
      <h4 className='italic'>A Remodified Version of my old GPA Calculator with new technology designed for Faculty of Computers and Artifical Intelligence Students @ Cairo University</h4>
    </div>
  
  </>
}
