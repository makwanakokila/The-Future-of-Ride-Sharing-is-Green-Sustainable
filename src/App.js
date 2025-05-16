import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import CarRides from "./components/Services/Car_Rides";
import Rentals from "./components/Services/Rentals";
import Auto_Rides from "./components/Services/Auto_Rides";
import Bike_Rides from "./components/Services/Bike_Rides";
import Intercity from "./components/Services/Intercity";
import Book_Ride from "./components/Services/Book_Ride";
import SignUp from "./components/User/Signup";
import Login from "./components/User/Login";
import OTPVerification from "./components/User/OTPVerification";
import ProfileLayout from "./components/profile/ProfileLayout"; // Corrected path
import Aboutpage from "./components/Aboutpage/Aboutpage";
import Allcities from "./components/Aboutpage/Allcities";
import { useAuth } from "./contexts/AuthContext";
import RideBooking from "./components/Home/RideBooking";
import BookRide from "./pages/BookRide"; // Corrected path
import BikeRide from "./components/rides/BikeRide"; // Corrected path
import ConfirmRide from "./components/rides/ConfirmRide";  // Corrected path
import AddPaymentMethod from "./components/rides/AddPaymentMethod"; // Corrected path
import RideTrackingPage from "./components/rides/RideTrackingPage"; // Corrected path
import RideCompleted from "./components/rides/RideCompleted";    // Corrected path
import HeroSafety from "./components/Safety/HeroSafety";

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user && window.location.pathname === "/profile") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/carrides" element={<CarRides />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/Auto_rides" element={<Auto_Rides />} />
            <Route path="/Bike_rides" element={<Bike_Rides />} />
            <Route path="/Intercity" element={<Intercity />} />
            <Route path="/Book_ride" element={<Book_Ride />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/Allcities" element={<Allcities />} />
            <Route path="/Safety" element={<HeroSafety />} />



            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otpverification" element={<OTPVerification />} />
            <Route path="/profile" element={<ProfileLayout />} /> {/* Corrected route */}
            <Route path="/book" element={<RideBooking />} />
            <Route path="/book-ride" element={<BookRide />} />
            <Route path="/bike-ride" element={<BikeRide />} />
            <Route path="/confirm" element={<ConfirmRide />} />
            <Route path="/add-payment" element={<AddPaymentMethod />} />
            <Route path="/ride-tracking" element={<RideTrackingPage />} />
            <Route path="/rating" element={<RideCompleted />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
