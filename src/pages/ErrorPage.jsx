import React from 'react'
import { Button } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';



const ErrorPage = () => {
    let navigate = useNavigate()
    return (
        <div className='w-full h-[100vh] flex flex-col items-center justify-center gap-1 md:gap-3 px-[1rem] dark:bg-black dark:text-white'>
            <h1 className="heading-l">404 Page</h1>
            <p className='text-sm md:text-[20px] text-center'>You have wandered away from website</p>
            <Button className='min-w-[10rem]' onClick={()=>navigate(-1)}>Go back</Button>
        </div>
    )
}

export default ErrorPage