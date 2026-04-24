import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
];

const Hero = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const isSeller = user?.role === "seller";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white">
      {/* Background Image */}
      <img
        src={images[current]}
        alt="Car"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
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
          <button onClick={() => navigate("/search")}
            className="bg-blue-900 hover:bg-blue-800 px-8 py-3 rounded-lg text-lg font-medium transition cursor-pointer"
          >
            Explore Cars
          </button>

          {isSeller && (
            <button
              onClick={() => navigate("/rent")}
              className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg text-lg font-medium transition cursor-pointer "
            >
              Rent Your Car
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
