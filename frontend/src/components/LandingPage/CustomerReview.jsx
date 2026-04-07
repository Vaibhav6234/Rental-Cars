import React from "react";

const CustomerReview = () => {
  return (
    <div className="px-8 py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Customer Reviews</h2>
      <div className="flex justify-around gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-800 text-2xl ">- John Smith </div>
          <p className="text-yellow-500 pl-3 mb-2">★★★★★</p>
          <p className="text-gray-700 mb-4">
            "Amazing service! The car was in perfect condition and the booking
            process was super smooth."
          </p>
          {/* <p className="font-semibold">- John Smith</p> */}
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-800 text-2xl">- Sarah Johnson </div>
          <p className="text-yellow-500 pl-3 mb-2">★★★★</p>
          <p className="text-gray-700 mb-4">
            "Great prices and excellent customer support. Highly recommend for
            anyone looking to rent a car."
          </p>
          {/* <p className="font-semibold">- Sarah Johnson</p> */}
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-800 text-2xl">- Mike Davis</div>
          <p className="text-yellow-500 pl-3 mb-2">★★★★</p>
          <p className="text-gray-700 mb-4">
            "Best rental experience ever! Clean cars, easy pickup, and
            affordable rates."
          </p>
          {/* <p className="font-semibold">- Mike Davis</p> */}
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
