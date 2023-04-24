import React, { createContext, useState, useEffect } from "react";
import Home from "./pages/Home";
import MedicineList from "./pages/MedicineList";
import HealthcareList from "./pages/HealthcareList";
import PharmaceuticalList from "./pages/PharmaceuticalList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import Main from "./pages/Main";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import PageNotFound from "./pages/404";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import ForgotPasswordOTP from "./pages/ForgotPasswordOTP";
import NewPassword from "./pages/NewPassword";
// import dotenv from 'dotenv';

// dotenv.config();

export const ThemeContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalCount, setTotalCount] = useState(0);


  return (
    <div className="App">
      <ThemeContext.Provider
        value={{ cart, setCart, total, setTotal, totalCount, setTotalCount }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/medicines" element={<MedicineList />} />
          <Route path="/healthcare" element={<HealthcareList />} />
          <Route path="/pharmaceutical" element={<PharmaceuticalList />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/otp" element = { <VerifyEmail /> } />
          <Route path="/forgotPassword" element={<ForgotPasswordEmail />} />
          <Route path="/forgotpasswordotp" element={<ForgotPasswordOTP />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
