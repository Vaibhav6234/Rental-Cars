import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ListingCard from './ListingCard'
import toast from 'react-hot-toast'

const SearchPage = ({ cars }) => {
  const [availableCars, setAvailableCars] = useState(cars ?? [])
  const [bookingDates, setBookingDates] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await axios.get('http://localhost:3000/api/car/get-car')
        setAvailableCars(response.data.carPosts ?? [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load cars.')
        setAvailableCars(cars ?? [])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [cars])

  const handleDateChange = (carId, field, value) => {
    setBookingDates((prev) => ({
      ...prev,
      [carId]: {
        ...prev[carId],
        [field]: value,
      },
    }))
  }

  const getTotalDays = (from, to) => {
    if (!from || !to) {
      return 0
    }

    const diffInMs = new Date(to) - new Date(from)
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

    return diffInDays > 0 ? diffInDays : 0
  }

  const getTotalPrice = (from, to, pricePerDay) => {
    const diffInDays = getTotalDays(from, to)

    return diffInDays > 0 ? diffInDays * Number(pricePerDay ?? 0) : Number(pricePerDay ?? 0)
  }

  const handleBookCar = () => {
    if (!localStorage.getItem('token')) {
      toast.error('Please login to book a car')
      navigate('/login')
      return
    }

    const selectedDates = bookingDates[carId] || {}
    const { from, to } = selectedDates

    if (!from || !to) {
      toast.error('Please select booking date from and to.')
      return
    }

    if (new Date(to) <= new Date(from)) {
      toast.error('Booking end date must be after start date.')
      return
    }

    const totalPrice = getTotalPrice(from, to, car.pricePerDay ?? car.price)
    const totalDays = getTotalDays(from, to)

    navigate('/checkout', {
      state: {
        bookingDetails: {
          car,
          carId,
          from,
          to,
          totalPrice,
          totalDays,
          pricePerDay: Number(car.pricePerDay ?? car.price ?? 0),
        },
      },
    })
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_50%,#f8fafc_100%)] px-6 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          {/* <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
            Browse Listings
          </p> */}
          <h2 className="mt-3 text-4xl font-bold text-slate-950">Available Cars</h2>
          <p className="mt-3 text-base text-slate-600">
            Pick your dates, compare prices, and book the right car in a few clicks.
          </p>
        </div>
        {isLoading && (
          <p className="mb-6 text-center text-xl text-gray-500">Loading cars...</p>
        )}
        {error && !isLoading && (
          <p className="mb-6 text-center text-lg text-red-500">{error}</p>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {availableCars.map((car, index) => {
            const carId = car._id || String(index)
            const selectedDates = bookingDates[carId] || { from: '', to: '' }
            const totalDays = getTotalDays(selectedDates.from, selectedDates.to)

            return (
              <ListingCard
                key={carId}
                car={car}
                carId={carId}
                selectedDates={selectedDates}
                totalDays={totalDays}
                onDateChange={handleDateChange}
                onBookCar={handleBookCar}
              />
            )
          })}
        </div>
        {!isLoading && availableCars.length === 0 && (
          <p className="text-center text-xl text-gray-500">No cars available yet</p>
        )}
      </div>
    </div>
  )
}

export default SearchPage
