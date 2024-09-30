import { Box } from '@mui/material'
import React, { useState } from 'react'
import { FloatingLabel, Button, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import cloudImg from '../../assets/sky-clouds.gif'


const Main = () => {
    const [error, setError] = useState(null)
    const [showResult, setShowResult] = useState(false); 
    const [city, setCity] = useState('')
    const [cityname, setCityname] = useState('')
    const [timezone, setTimezone] = useState('')
    const [temp, setTemp] = useState('')
    const [weather, setWeather] = useState('')
    const [weathericon, setWeathericon] = useState('')
    const [wSpeed, setWSpeed] = useState('')
    const [humidity, setHumidity] = useState('')


    const fetchWeatherData = async () => {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        // console.log(baseURL);

        try {
            const response = await fetch(baseURL)
            if (!response.ok) {
                setError(`City isn't in database 😢. Try entering another one !`)
                setShowResult(false); 
                throw new Error('City not found'); // Throw an error if response is not ok

            }
            // setting error md null
            setError(null);
            const data = await response.json()
            console.log(data);

            // set city name
            setCityname(data.name)
            // set time zone
            const timezoneOffsetSeconds = data.timezone;
            const localDate = new Date(Date.now() + timezoneOffsetSeconds * 1000); // Adjust current UTC time
            setTimezone(localDate.toLocaleString())
            // set temperature
            // data.main.temp
            // setTemp(data.main.temp)
            setTemp(Math.floor((data.main.temp - 32) * 5/9))
            // weather type
            setWeather(data.weather[0].main)
            // wind speed
            setWSpeed(data.wind.speed)
            // humidity
            setHumidity(data.main.humidity)
            // weather icon
            const iconCode = data.weather[0].icon
            setWeathericon(`http://openweathermap.org/img/wn/${iconCode}@2x.png`)
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // set visiblity true
            setShowResult(true);


        } catch (error) {
            console.log(error.message)

        }
    }

    const DisplayWeather = () => {
        if (city.trim() === '') {
            setError("Please enter a city name.");
            return;
        }

        fetchWeatherData()
    }


    return (
        <Box className='w-full min-h-full md:h-full border-2 border-dotted border-black bg-cover bg-no-repeat bg-center pt-[6rem] pb-[4rem] md:pb-0 md:pt-[4rem] px-[2rem] flex flex-col items-center justify-center gap-5 '
            sx={{ backgroundImage: `url(${cloudImg})`, }} >
            {error && 
            <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Error alert!</span> {error}
            </Alert>}
            <Box className='flex flex-col md:flex-row items-center justify-center gap-5' >
                <Box component={"div"} className='max-w-[30rem] h-auto flex flex-col gap-4 bg-white p-[2rem] md:p-[3rem] rounded-md shadow-lg' >
                    <h1 className="heading-l">
                        Enter the District
                    </h1>
                    <FloatingLabel onChange={(e) => setCity(e.target.value)} variant="standard" label="Enter name of district" className='text-[14px] md:text-base dark:text-black' />
                    <Button color="blue" className='w-full' onClick={DisplayWeather}>Submit</Button>
                </Box>
                <Box id='result' component={"div"} className={`max-w-[30rem] mb-[2rem] md:mb-0 bg-white p-[2rem] flex-col md:flex-row md:p-[3rem] items-center gap-6 rounded-sm shadow-xl ${!showResult ? 'hidden' : 'flex'}`}>
                    <img src={weathericon} className='w-[7rem] md:w-[11rem] h-[7rem] md:h-[11rem]' alt="" />
                    <Box component={"div"}>
                        <p>{timezone ? timezone : "local time"}</p>
                        <h2 className='heading-lg'>{cityname ? cityname : "City name"}</h2>
                        <p className='heading-m'>{temp ? temp : "Temp"} °C</p>
                        <span>{weather ? weather : "weather"}</span> || <span>{wSpeed ? wSpeed : "Wind Speed"} m/s</span> || <span>{humidity ? humidity : "Humidity"} %</span>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Main