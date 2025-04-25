import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LoginPage,
  SignupPage,
  Home,
  CreateProduct,
  MyProducts,
  Cart,
  ProductDetails,
  Profile,
  CreateAddress,
  SelectAddress,
  OrderConfirmation,
  MyOrdersPage
} from "./Routes";
import "./App.css";

const App = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  // Protected Route Wrapper
  const RequireAuth = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/create-product" element={<RequireAuth><CreateProduct /></RequireAuth>} />
        <Route path="/create-product/:id" element={<RequireAuth><CreateProduct /></RequireAuth>} />
        <Route path="/my-products" element={<RequireAuth><MyProducts /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
        <Route path="/product/:id" element={<RequireAuth><ProductDetails /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/create-address" element={<RequireAuth><CreateAddress /></RequireAuth>} />
        <Route path="/select-address" element={<RequireAuth><SelectAddress /></RequireAuth>} />
        <Route path="/order-confirmation" element={<RequireAuth><OrderConfirmation /></RequireAuth>} />
        <Route path="/myorders" element={<RequireAuth><MyOrdersPage /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
