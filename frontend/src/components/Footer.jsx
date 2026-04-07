import React from 'react'

const Footer = () => {
  return (
    <div className="bg-blue-950 text-white px-8 py-10">
      <div className="flex justify-between mb-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Rental Cars</h3>
          <p className="text-gray-300">Your trusted partner for premium car rentals</p>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="text-gray-300 space-y-2">
            <li>Home</li>
            <li>About Us</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <ul className="text-gray-300 space-y-2">
            <li>Email: info@rentalcars.com</li>
            <li>Phone: +1 234 567 8900</li>
            <li>Address: 123 Main St, City</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-6 text-center text-gray-300">
        <p>&copy; 2024 Rental Cars. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
