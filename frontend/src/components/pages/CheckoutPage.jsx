import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;
  const [isPaying, setIsPaying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 md:px-6 py-8 md:py-12">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 md:p-8 text-center shadow-lg">
          <h2 className="mb-3 text-2xl md:text-3xl font-bold text-blue-950">
            No Booking Found
          </h2>
          <p className="mb-6 text-gray-600">
            Please select a car first, then continue to checkout.
          </p>
          <button
            onClick={() => navigate("/search")}
            className="rounded-lg bg-blue-950 px-6 py-3 text-white hover:bg-blue-900"
          >
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  const { car, carId, from, to, totalPrice, totalDays, pricePerDay } =
    bookingDetails;

  const handlePayNow = async () => {
    try {
      setIsPaying(true);

      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_URL}/api/booking/book-car`, {
        carId,
        from,
        to,
        totalPrice,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowSuccessModal(true);
    } catch (error) {
      const message =
        error.response?.data?.message || "Payment failed. Please try again.";
      alert(message);
    } finally {
      setIsPaying(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    navigate("/search");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 md:px-6 py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Booking Details
            </p>
            <h1 className="mb-6 text-2xl md:text-3xl font-bold text-blue-950">
              Review Your Car Before Payment
            </h1>

            <div className="overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={car.image}
                alt={car.carName}
                className="h-48 md:h-72 w-full object-cover"
              />
              <div className="grid gap-4 p-4 md:p-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Car Name</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {car.carName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Model</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {car.model || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {car.fuelType || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price Per Day</p>
                  <p className="text-xl font-semibold text-gray-900">
                    ${pricePerDay}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking From</p>
                  <p className="text-xl font-semibold text-gray-900">{from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking To</p>
                  <p className="text-xl font-semibold text-gray-900">{to}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-3xl bg-blue-950 p-6 text-white shadow-lg">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Checkout
            </p>
            <h2 className="mb-6 text-2xl md:text-3xl font-bold">Total Amount</h2>

            <div className="space-y-4 rounded-2xl bg-white/10 p-5">
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Rental Days</span>
                <span className="text-xl font-semibold">{totalDays}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Rate Per Day</span>
                <span className="text-xl font-semibold">${pricePerDay}</span>
              </div>
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg text-blue-100">Grand Total</span>
                  <span className="text-3xl font-bold">${totalPrice}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayNow}
              disabled={isPaying}
              className="mt-6 w-full rounded-xl bg-white py-3 text-lg font-semibold text-blue-950 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPaying ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <h3 className="mb-3 text-3xl font-bold text-green-700">
              Payment Done
            </h3>
            <p className="mb-6 text-gray-600">
              Your booking has been confirmed successfully.
            </p>
            <button
              onClick={closeModal}
              className="w-full rounded-xl bg-blue-950 py-3 text-white hover:bg-blue-900"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
