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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true)
        setError('')
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/car/get-car?page=${page}&limit=6`)
        setAvailableCars(response.data.carPosts ?? [])
        setTotalPages(response.data.totalPages ?? 1)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load cars.')
        setAvailableCars(cars ?? [])
      } finally {
        setIsLoading(false)
      }
    }
    fetchCars()
  }, [page])

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

  const handleBookCar = (car, carId) => {
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

  const SkeletonCard = () => (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="h-48 md:h-64 w-full bg-slate-200 animate-pulse" />
      <div className="space-y-4 p-5">
        <div className="flex gap-2">
          <div className="h-8 w-24 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-8 w-20 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-8 w-22 rounded-full bg-slate-200 animate-pulse" />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="grid gap-3 md:grid-cols-2">
            <div className="h-10 rounded-2xl bg-slate-200 animate-pulse" />
            <div className="h-10 rounded-2xl bg-slate-200 animate-pulse" />
          </div>
        </div>
        <div className="h-14 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_50%,#f8fafc_100%)] px-6 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mt-3 text-2xl md:text-4xl font-bold text-slate-950">Available Cars</h2>
          <p className="mt-3 text-base text-slate-600">
            Pick your dates, compare prices, and book the right car in a few clicks.
          </p>
        </div>
        {error && !isLoading && (
          <p className="mb-6 text-center text-lg text-red-500">{error}</p>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
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
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition cursor-pointer ${
                  p === page
                    ? 'bg-slate-900 text-white shadow'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
