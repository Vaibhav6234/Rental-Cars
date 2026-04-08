import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import RentYourCar from "./components/cars/RentYourCar";
import SearchPage from "./components/cars/SearchPage";
import CheckoutPage from "./components/CheckoutPage";
import ProfilePage from "./components/ProfilePage";
import Chatbot from "./components/Chatbot";

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
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
