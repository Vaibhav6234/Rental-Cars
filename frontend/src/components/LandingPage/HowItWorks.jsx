import React from 'react'

const HowItWorks = () => {
  return (
    <div className="px-8 py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
      <div className="flex justify-around items-start gap-8">
        <div className="flex-1 text-center bg-blue-50 rounded-3xl px-6 py-10">
          <div className="text-5xl font-bold text-blue-950 mb-4">1</div>
          <h3 className="text-2xl font-semibold mb-3">Search</h3>
          <p className="text-gray-600">Browse our wide selection of premium vehicles</p>
        </div>
        <div className="flex-1 text-center bg-blue-50 rounded-3xl px-6 py-10">
          <div className="text-5xl font-bold text-blue-950 mb-4">2</div>
          <h3 className="text-2xl font-semibold mb-3">Select Car</h3>
          <p className="text-gray-600">Choose your perfect ride from available options</p>
        </div>
        <div className="flex-1 text-center bg-blue-50 rounded-3xl px-6 py-10">
          <div className="text-5xl font-bold text-blue-950 mb-4">3</div>
          <h3 className="text-2xl font-semibold mb-3">Choose Date & Time</h3>
          <p className="text-gray-600">Pick your rental period that suits your schedule</p>
        </div>
        <div className="flex-1 text-center bg-blue-50 rounded-3xl px-6 py-10">
          <div className="text-5xl font-bold text-blue-950 mb-4">4</div>
          <h3 className="text-2xl font-semibold mb-3">Book Your Car</h3>
          <p className="text-gray-600">Complete booking and hit the road</p>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
