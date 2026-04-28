import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import Chatbot from "./components/pages/Chatbot";

const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));
const Login = lazy(() => import("./components/pages/Login"));
const Register = lazy(() => import("./components/pages/Register"));
const RentYourCar = lazy(() => import("./components/cars/RentYourCar"));
const SearchPage = lazy(() => import("./components/cars/SearchPage"));
const CheckoutPage = lazy(() => import("./components/pages/CheckoutPage"));
const ProfilePage = lazy(() => import("./components/pages/ProfilePage"));
const FavoritesPage = lazy(() => import("./components/cars/FavoritesPage"));
const InboxPage = lazy(() => import("./components/pages/InboxPage"));

const App = () => {
  const savedUser = JSON.parse(localStorage.getItem('user'))
  const [userType, setUserType] = useState(savedUser?.role ?? null);
  const [cars, setCars] = useState([]);

  const handleLogin = (role) => {
    setUserType(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserType(null);
  };

  const handleAddCar = (car) => {
    setCars([...cars, car]);
  };

  return (
    <Router>
      <Toaster position="top-right" />
      <div>
        <Header userType={userType} onLogout={handleLogout} />
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="/rent" element={<RentYourCar onAddCar={handleAddCar} />} />
            <Route path="/search" element={<SearchPage cars={cars} />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage onLogin={handleLogin} />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/inbox" element={<InboxPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
