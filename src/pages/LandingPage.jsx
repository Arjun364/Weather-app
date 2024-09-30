import React from 'react'
import Header from '../Components/LandingPage/Header'
import Footersection from '../Components/LandingPage/Footersection'
import Main from '../Components/LandingPage/Main'

const LandingPage = () => {
  return (
    <div className='w-full h-[100vh] flex flex-col justify-between' >
      <Header/>
      <Main/>
      <Footersection/>
    </div>
  )
}

export default LandingPage