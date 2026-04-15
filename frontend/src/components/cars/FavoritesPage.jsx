import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingCard from './ListingCard'
import toast from 'react-hot-toast'

const getFavorites = () => JSON.parse(localStorage.getItem('favorites') || '[]')

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(getFavorites)
  const [bookingDates, setBookingDates] = useState({})
  const navigate = useNavigate()

  const handleDateChange = (carId, field, value) => {
    setBookingDates((prev) => ({ ...prev, [carId]: { ...prev[carId], [field]: value } }))
  }

  const getTotalDays = (from, to) => {
    if (!from || !to) return 0
    const diff = Math.ceil((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const getTotalPrice = (from, to, pricePerDay) => {
    const days = getTotalDays(from, to)
    return days > 0 ? days * Number(pricePerDay ?? 0) : Number(pricePerDay ?? 0)
  }

  const handleBookCar = (car, carId) => {
    if (!localStorage.getItem('token')) {
      toast.error('Please login to book a car')
      navigate('/login')
      return
    }
    const { from, to } = bookingDates[carId] || {}
    if (!from || !to) { toast.error('Please select booking date from and to.'); return }
    if (new Date(to) <= new Date(from)) { toast.error('Booking end date must be after start date.'); return }
    navigate('/checkout', {
      state: {
        bookingDetails: {
          car, carId, from, to,
          totalPrice: getTotalPrice(from, to, car.pricePerDay ?? car.price),
          totalDays: getTotalDays(from, to),
          pricePerDay: Number(car.pricePerDay ?? car.price ?? 0),
        },
      },
    })
  }

  // Re-sync when a car is unfavorited from this page
  const handleFavoriteChange = () => setFavorites(getFavorites())

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_50%,#f8fafc_100%)] px-6 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-950">My Favorites</h2>
            <p className="mt-2 text-base text-slate-600">Cars you've saved for later.</p>
          </div>
        </div>
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            {/* <span className="text-6xl mb-4">🤍</span> */}
            <p className="text-xl font-semibold text-slate-700">No favorites yet</p>
            <p className="mt-2 text-slate-500">Browse cars and tap the heart to save them here.</p>
            <button
              onClick={() => navigate('/search')}
              className="mt-6 rounded-2xl bg-blue-900 px-6 py-3 text-sm font-medium text-white  transition cursor-pointer"
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favorites.map((car, index) => {
              const carId = car._id || String(index)
              const selectedDates = bookingDates[carId] || { from: '', to: '' }
              return (
                <ListingCard
                  key={carId}
                  car={car}
                  carId={carId}
                  selectedDates={selectedDates}
                  totalDays={getTotalDays(selectedDates.from, selectedDates.to)}
                  onDateChange={handleDateChange}
                  onBookCar={handleBookCar}
                  onFavoriteChange={handleFavoriteChange}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
