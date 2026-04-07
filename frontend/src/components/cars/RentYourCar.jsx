import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RentYourCar = ({ onAddCar }) => {
  const [carName, setCarName] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [model, setModel] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [image, setImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handlePost = async () => {
    if (!carName || !pricePerDay || !image) {
      alert('Please fill all fields')
      return
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('image', image)
      formData.append('carName', carName)
      formData.append('pricePerDay', pricePerDay)
      formData.append('model', model)
      formData.append('fuelType', fuelType)

      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/post-car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      if (onAddCar) {
        onAddCar(response.data.carPost)
      }

      setCarName('')
      setPricePerDay('')
      setModel('')
      setFuelType('')
      setImage(null)
      alert(response.data.message || 'Car posted successfully!')
      navigate('/search')
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to post car. Please try again.'
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Rent Your Car</h2>
        
        <input 
          type="text" 
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        
        <input 
          type="number" 
          placeholder="Price per day"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input 
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input 
          type="text"
          placeholder="Fuel Type"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input 
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6"
        />

        <button 
          onClick={handlePost}
          disabled={isSubmitting}
          className="w-full bg-blue-950 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-900"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  )
}

export default RentYourCar
