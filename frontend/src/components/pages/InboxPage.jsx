import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const InboxPage = () => {
  const [inbox, setInbox] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const fetchInbox = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/booking/inbox`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setInbox(data.inbox || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load inbox')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchInbox()
  }, [])

  const updateStatus = async (bookingId, status) => {
    try {
      setUpdatingId(bookingId)
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/booking/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success(status === 'confirmed' ? 'Booking confirmed' : 'Booking cancelled')
      setInbox((prev) =>
        prev.map((item) => {
          if (item.bookingId !== bookingId) return item
          return {
            ...item,
            status,
            canRespond: false,
            message:
              status === 'confirmed'
                ? `You confirmed booking for ${item.car?.carName || 'your car'}.`
                : `You declined booking for ${item.car?.carName || 'your car'}.`,
          }
        })
      )
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update booking status')
    } finally {
      setUpdatingId('')
    }
  }

  const deleteInboxItem = async (bookingId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setInbox((prev) => prev.filter((item) => item.bookingId !== bookingId))
      toast.success('Inbox item deleted')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete inbox item')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'seller'
              ? 'Review booking requests for your cars.'
              : 'Track booking updates from sellers.'}
          </p>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Loading inbox...</p>
          </div>
        ) : inbox.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inbox.map((item) => (
              <div key={item.bookingId} className="bg-white rounded-2xl shadow p-5 border border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{item.car?.carName || 'Car Booking'}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(item.from).toLocaleDateString()} to {new Date(item.to).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Total: ${item.totalPrice}</p>
                    {item.buyer?.name && (
                      <p className="text-sm text-gray-500 mt-1">Buyer: {item.buyer.name}</p>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${statusStyles[item.status] || 'bg-gray-100 text-gray-700'}`}>
                    {item.status}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-700">{item.message}</p>

                {item.canRespond && user?.role === 'seller' && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => updateStatus(item.bookingId, 'confirmed')}
                      disabled={updatingId === item.bookingId}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-70"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(item.bookingId, 'cancelled')}
                      disabled={updatingId === item.bookingId}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-70"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {!item.canRespond && (
                  <div className="mt-4 flex ">
                    <button
                      onClick={() => deleteInboxItem(item.bookingId)}
                      className="px-4 py-2 rounded-lg bg-red-800 text-gray-100 "
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InboxPage
