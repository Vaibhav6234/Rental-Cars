import React from 'react'

const ListingCard = ({ car, carId, selectedDates, totalDays, onDateChange, onBookCar }) => {
  const pricePerDay = Number(car.pricePerDay ?? car.price ?? 0)
  const totalAmount = totalDays > 0 ? totalDays * pricePerDay : pricePerDay
  const specs = [
    car.model ? { label: 'Model', value: car.model } : null,
    car.fuelType ? { label: 'Fuel', value: car.fuelType } : null,
    { label: 'Status', value: 'Available' },
  ].filter(Boolean)

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div className="relative">
        <img
          src={car.image}
          alt={car.carName}
          className="h-48 md:h-64 w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

        <div className="absolute  right-5 top-5 flex items-start justify-between">
          {/* <span className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Premium Ride
          </span> */}
          <div className="rounded-2xl bg-white/95 px-4 py-2 text-right shadow-lg">
            {/* <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Rate</p> */}
            <p className="text-xl font-bold text-slate-950">
              ${pricePerDay}
              <span className="text-sm font-medium text-slate-500">/day</span>
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-2xl font-bold text-white drop-shadow-sm">{car.carName}</h3>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
            >
              <span className="font-semibold text-slate-950">{spec.label}:</span> {spec.value}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_100%)] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Booking Setup
              </p>
              <p className="mt-1 text-base font-semibold text-slate-950">Choose your dates</p>
            </div>
            <div className="rounded-2xl bg-white px-3 py-1.5 text-center shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Days</p>
              <p className="text-lg font-bold text-slate-950">{totalDays}</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">From</span>
              <input
                type="date"
                value={selectedDates.from}
                onChange={(e) => onDateChange(carId, 'from', e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">To</span>
              <input
                type="date"
                value={selectedDates.to}
                min={selectedDates.from || undefined}
                onChange={(e) => onDateChange(carId, 'to', e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-3xl bg-slate-800 px-4 py-3.5 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Estimated Total
            </p>
            <p className="mt-1 text-2xl font-bold">${totalAmount}</p>
          </div>
          <button
            onClick={() => onBookCar(car, carId)}
            className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-blue-100 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  )
}

export default ListingCard
