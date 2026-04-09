import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-10 md:py-14 bg-gray-100 gap-8">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl text-black font-bold mb-4">Find Your Perfect Ride</h1>
        <p className="text-base md:text-xl text-gray-900 mb-4">Rent premium cars at affordable prices</p>
        <p className="text-sm md:text-lg text-gray-700 mb-8">Choose from a wide range of luxury and economy vehicles. Flexible rental plans with 24/7 customer support.</p>
        <button onClick={() => navigate('/search')} className="bg-blue-950 rounded-md text-white px-8 py-3 text-lg cursor-pointer">Get Started</button>
      </div>
      <div className="flex-1 flex justify-center md:justify-end w-full">
        <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600" alt="Car" className="w-full md:w-3/4 h-56 md:h-96 object-cover rounded-lg" />
      </div>
    </div>
  )
}

export default Hero
