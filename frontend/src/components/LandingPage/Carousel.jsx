import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DESKTOP_VISIBLE = 3

const Carousel = () => {
  const [cars, setCars] = useState([])
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const timerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/car/get-car`)
      .then(res => setCars(res.data.carPosts ?? []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = (e) => setIsMobile(e.matches)

    setIsMobile(media.matches)

    if (media.addEventListener) {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }

    media.addListener(update)
    return () => media.removeListener(update)
  }, [])

  const visibleCount = isMobile ? 1 : DESKTOP_VISIBLE

  useEffect(() => {
    if (cars.length <= visibleCount) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % cars.length)
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [cars, visibleCount])

  const goTo = (i) => {
    clearInterval(timerRef.current)
    setCurrent(i)
  }

  const prev = () => goTo((current - 1 + cars.length) % cars.length)
  const next = () => goTo((current + 1) % cars.length)

  const visible = Array.from(
    { length: Math.min(visibleCount, cars.length) },
    (_, i) => cars[(current + i) % cars.length]
  )

  if (cars.length === 0) return null

  return (
    <section className="px-4 py-12 md:px-8 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-950">Featured Cars</h2>
          <p className="mt-2 text-base text-slate-600">Explore our top listings available for rent</p>
        </div>

        <div className="relative flex items-center gap-2 md:gap-3">
          <button onClick={prev} className="shrink-0 rounded-full bg-white border border-slate-200 hover:bg-slate-100 p-2 shadow transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-w-0">
            {visible.map((car, i) => (
              <div key={car._id ?? i} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-300">
                <div className="relative">
                  <img src={car.image} alt={car.carName} className="h-40 w-full object-cover object-center group-hover:scale-[1.02] transition duration-500" />
                  <span className="absolute top-3 right-3 rounded-xl bg-white/95 px-3 py-1 text-sm font-bold text-slate-950 shadow">
                    ${car.pricePerDay ?? car.price}/day
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-950 text-base">{car.carName}</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {car.model && <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">Model: {car.model}</span>}
                    {car.fuelType && <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">{car.fuelType}</span>}
                  </div>
                  <button
                    onClick={() => navigate('/search')}
                    className="mt-3 w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={next} className="shrink-0 rounded-full bg-white border border-slate-200 hover:bg-slate-100 p-2 shadow transition cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6 bg-slate-950' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
