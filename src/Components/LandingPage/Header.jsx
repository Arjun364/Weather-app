import React, { useEffect, useRef } from 'react';
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';
import icon from '../../assets/wired-outline-1-cloud-hover-pinch.gif'
const Header = () => {


    useEffect(() => {

    }, []);

    return (
        <Navbar fluid className='absolute top-0 w-full flex justify-center px-[2rem] py-3 dark:bg-black/15 backdrop-blur-md'>
            <Navbar.Brand className='flex items-center gap-3' as={Link} href="https://flowbite-react.com">
                <img className='w-[3rem] '  src={icon} alt="" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Weather App
                </span>
            </Navbar.Brand>
        </Navbar>
    );
};

export default Header;
