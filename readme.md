# Rental Cars

Rental Cars is a full-stack car rental marketplace built with React, Vite, Node.js, Express, and MongoDB. It supports two user roles:

- `buyer`: browse cars, choose booking dates, and place bookings
- `seller`: upload car listings with images and manage posted cars from the profile page

The project includes JWT-based authentication, profile management, car listing uploads, booking flow, and image hosting through ImageKit.

## Features

- User registration and login
- Buyer and seller role selection during signup
- JWT-protected backend routes
- Seller car posting with image upload
- Public car search and listing page with search by name or model
- Save cars to favorites (stored locally) and view them on a dedicated page
- Booking checkout flow with date-based total price calculation
- Profile editing with avatar upload
- Seller dashboard showing posted cars
- Buyer dashboard showing booking history

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- React Hot Toast
- Tailwind CSS import in `index.css`

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs
- Multer
- ImageKit

## Project Structure

```text
Rental Cars/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- index.css
|   |-- package.json
|   `-- vite.config.js
|-- backend/
|   |-- src/
|   |   |-- db/
|   |   |-- middleware/
|   |   |-- model/
|   |   |-- services/
|   |   `-- app.js
|   |-- server.js
|   `-- package.json
`-- readme.md
```

## Main User Flow

### Buyer flow

1. Register or log in as a `buyer`
2. Open the search page and browse available cars
3. Choose booking start and end dates
4. Continue to checkout
5. Confirm booking
6. View bookings from the profile page

### Seller flow

1. Register or log in as a `seller`
2. Open `Rent your car`
3. Upload a car image and listing details
4. Submit the listing
5. View posted cars from the profile page

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

## Installation

### 1. Install frontend dependencies

```bash
cd frontend
npm install
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

## Run the Project

### Start the backend

```bash
cd backend
node server.js
```

The backend code listens on port `3000`.

### Start the frontend

```bash
cd frontend
npm run dev
```

Then open the Vite local URL shown in the terminal.

## API Endpoints

### Auth

- `POST /register` - create a user account
- `POST /login` - authenticate user and return token

### Cars

- `POST /post-car` - seller-only route to create a car listing
- `GET /get-car` - fetch all car listings

### Booking

- `POST /book-car` - create a booking for the logged-in user

### Profile

- `GET /profile` - fetch the logged-in user profile
- `PUT /profile` - update name and phone
- `PUT /profile/avatar` - upload profile avatar

## Notes

- Protected routes require `Authorization: Bearer <token>`
- Car image uploads and avatar uploads are stored through ImageKit
- The frontend currently calls the backend at `http://localhost:3000`
- The backend package does not currently include a dev script, so it is started with `node server.js`
- There are no automated tests configured yet

## Current Pages

- `/` - landing page
- `/login` - login page
- `/register` - registration page
- `/search` - browse and search available cars
- `/favorites` - saved favorite cars
- `/rent` - seller car posting page
- `/checkout` - booking confirmation page
- `/profile` - profile, cars, and bookings page

## Future Improvements

- Add booking availability validation to prevent overlapping reservations
- Add seller-side booking management
- Add better error handling and validation on the backend
- Add frontend environment variables for API base URL
- Add automated tests
- Add payment gateway integration instead of simulated checkout
