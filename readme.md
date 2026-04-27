# Rental Cars

Rental Cars is a full-stack car rental marketplace built with React, Vite, Node.js, Express, and MongoDB.

It supports two user roles:
- `buyer`: browse cars, pick dates, and place bookings
- `seller`: post car listings with images and manage their listings

## Features

- JWT-based authentication
- Buyer and seller role-based flow
- Seller car posting with image upload
- Car browsing and search by name/model
- Favorites page (local storage)
- Booking checkout with date-based pricing
- Profile editing with avatar upload
- Seller dashboard for posted cars
- Buyer dashboard for bookings
- Inbox view for bookings (buyer + seller)
- AI chatbot (OpenRouter) for rental help

## Tech Stack

- Frontend: React 19, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, Multer, ImageKit
- AI: OpenRouter (via `openai` SDK)

## Project Structure

```text
Rental Cars/
|-- frontend/
|-- backend/
|-- package.json
`-- readme.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB database (local or Atlas)
- ImageKit account
- OpenRouter API key (for chatbot)

## Environment Variables

Create `backend/.env` (do not commit it):

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

## Installation

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

## Run Locally

Run frontend and backend together from the project root:

```bash
npm run dev
```

Individual services:

```bash
# backend (http://localhost:3000)
npm run dev --prefix backend

# frontend (Vite dev server)
npm run dev --prefix frontend
```

## Key API Endpoints

Base URL (local): `http://localhost:3000`

Auth (`/api/auth`)
- `POST /api/auth/register`
- `POST /api/auth/login`

Cars (`/api/car`)
- `POST /api/car/post-car` (seller, multipart form with `image`)
- `GET /api/car/get-car` (supports `page`, `limit`, `search`)

Bookings + inbox (`/api/booking`)
- `POST /api/booking/book-car` (buyer)
- `GET /api/booking/inbox` (buyer + seller)
- `PATCH /api/booking/:bookingId/status` (seller, body: `{ "status": "confirmed" | "cancelled" }`)
- `DELETE /api/booking/:bookingId` (buyer or seller; only after processed)

Profile (`/api/user`)
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `PUT /api/user/profile/avatar` (multipart form with `avatar`)

Chatbot (`/api/chat`)
- `POST /api/chat` (body: `{ "message": "..." }`)

## Frontend Routes

- `/`
- `/login`
- `/register`
- `/search`
- `/favorites`
- `/rent`
- `/checkout`
- `/profile`
- `/inbox`

## Notes

- Protected routes require `Authorization: Bearer <token>`
- Frontend uses `import.meta.env.VITE_API_URL` for the backend base URL
- Backend mounts routes under `/api/*`
- No automated tests are configured yet

## Future Improvements

- Prevent overlapping bookings with availability checks
- Add seller-side booking management
- Strengthen validation and error handling
- Move API base URL to environment config
- Add automated tests and CI
- Integrate real payments
