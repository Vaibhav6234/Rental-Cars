import React from 'react'
import { useNavigate } from 'react-router-dom'
import landingPageImage from '../../../public/landing-page-img.jpg'

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white">
      
      {/* Background Image */}
      <img
        src={landingPageImage}
        alt="Car"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your Perfect Ride
        </h1>

        <p className="text-lg md:text-2xl font-semibold mb-4 text-white">
          Rent premium cars at affordable prices
        </p>

        <p className="text-sm md:text-base mb-8 text-white">
          Luxury, SUVs, and budget cars with flexible plans & instant booking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <button
            onClick={() => navigate('/search')}
            className="bg-blue-900 hover:bg-blue-800 px-8 py-3 rounded-lg text-lg font-medium transition"
          >
            Explore Cars
          </button>

          <button
            onClick={() => navigate('/')}
            className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg text-lg font-medium transition"
          >
            Learn More
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero