import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RentYourCar from "./components/cars/RentYourCar";
import SearchPage from "./components/cars/SearchPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import ProfilePage from "./components/pages/ProfilePage";
import Chatbot from "./components/pages/Chatbot";
import FavoritesPage from "./components/cars/FavoritesPage";
import InboxPage from "./components/pages/InboxPage";

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
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
