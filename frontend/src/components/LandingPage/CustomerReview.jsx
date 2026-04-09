import React from "react";

const CustomerReview = () => {
  return (
    <div className="px-4 md:px-8 py-12 md:py-16 bg-gray-100">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 md:mb-12">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-800 text-xl md:text-2xl">- John Smith </div>
          <p className="text-yellow-500 pl-3 mb-2">★★★★★</p>
          <p className="text-gray-700 mb-4">
            "Amazing service! The car was in perfect condition and the booking
            process was super smooth."
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-800 text-xl md:text-2xl">- Sarah Johnson </div>
          <p className="text-yellow-500 pl-3 mb-2">★★★★</p>
          <p className="text-gray-700 mb-4">
            "Great prices and excellent customer support. Highly recommend for
            anyone looking to rent a car."
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-800 text-xl md:text-2xl">- Mike Davis</div>
          <p className="text-yellow-500 pl-3 mb-2">★★★★</p>
          <p className="text-gray-700 mb-4">
            "Best rental experience ever! Clean cars, easy pickup, and
            affordable rates."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
