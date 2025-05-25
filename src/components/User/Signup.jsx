"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCar, FaIdCardAlt } from "react-icons/fa";

export default function App() {
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    vehicleNumber: "",
    vehicleModel: "",
    drivingLicense: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [otpVerified, setOtpVerified] = useState(false);
  const [simulatedCorrectOtp, setSimulatedCorrectOtp] = useState("");

  const otpInputRefs = useRef([]);

  useEffect(() => {
    if (otpSent && timer > 0 && !otpVerified) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer, otpVerified]);

  useEffect(() => {
    if (otp.length === 6) {
      if (otp === simulatedCorrectOtp) {
        setOtpVerified(true);
        alert("OTP Verified Successfully!");
      } else {
        setOtpVerified(false);
        alert("Incorrect OTP. Please try again.");
        setOtp(""); // This line clears the OTP input boxes
      }
    }
  }, [otp, simulatedCorrectOtp]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!otpSent || !otpVerified) {
      alert("Please verify your email with the OTP.");
      return;
    }

    if (userType === 'driver') {
      if (!formData.vehicleNumber || !formData.vehicleModel || !formData.drivingLicense) {
        alert("Please fill all driver details: Vehicle Number, Vehicle Model/Name, and Driving License.");
        return;
      }
    }

    console.log("Form Data Submitted:", formData);
    console.log("User Type:", userType);
    console.log("OTP Entered:", otp);
    alert(`Account created successfully for ${userType}!`);
  };

  const handleOtpSend = () => {
    if (!formData.email) {
      alert("Please enter email first!");
      return;
    }
    setOtpSent(true);
    setOtp("");
    setTimer(30);
    setOtpVerified(false);

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedCorrectOtp(newOtp);
    alert(`OTP sent to ${formData.email}. (Simulated OTP: ${newOtp}). Please check your inbox.`);
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;

    // Only allow single digit or empty string (for backspace)
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = otp.split('');
    newOtp[index] = value;
    const updatedOtp = newOtp.join('');

    setOtp(updatedOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
        // Auto-focus previous input on backspace if current is empty
        otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData);
      // After pasting, focus the last input for visual completion
      otpInputRefs.current[5]?.focus();
    }
  };

  return (
     <div className="relative min-h-screen flex justify-center items-start pt-20 pb-10 bg-[#166534] dark:bg-[#111827] overflow-hidden "> {/* Removed conflicting classes */}
      {/* Background Image Layer with specific style properties */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 mt-16 ml-30 opacity-9 "
       style={{
          backgroundImage: "url('/images/signup-costomer-img.png')", // Updated image filename
          backgroundPosition: "center", // Added: Centers the image
          backgroundSize: "contain",    // Added: Ensures the entire image fits within the container
          backgroundRepeat: "no-repeat", // Added: Prevents image repetition if 'contain' leaves space
          backgroundBlendMode: "overlay", // Re-added as requested
        }}
      ></div>

      <div className="relative p-10 rounded-xl w-full max-w-xl z-10 ">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-300 text-center mb-4 text-lg">
          Join us to start your journey. Enter your details below to create a
          new account.
        </p>

        {/* User Type Selection */}
        <div className="flex justify-center mb-4 gap-4">
          <button
            type="button"
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-200
              ${userType === 'customer' ? 'bg-green-600 text-white shadow-lg' : 'bg-white/20 text-gray-300 hover:bg-white/30'}`}
            onClick={() => setUserType("customer")}
            disabled={otpSent && !otpVerified}
          >
            Customer
          </button>
          <button
            type="button"
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-200
              ${userType === 'driver' ? 'bg-green-600 text-white shadow-lg' : 'bg-white/20 text-gray-300 hover:bg-white/30'}`}
            onClick={() => setUserType("driver")}
            disabled={otpSent && !otpVerified}
          >
            Driver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="text-white block mb-2 text-start">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="pl-10 pr-4 py-3 w-full bg-transparent text-white border border-white rounded-md focus:outline-none placeholder-gray-500"
                value={formData.fullName}
                onChange={handleChange}
                required
                // Removed: disabled={!otpVerified}
              />
            </div>
          </div>

          {/* Email + OTP Button */}
          <div>
            <label className="text-white block mb-2 text-start">Email Address</label>
            <div className="relative flex items-center">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={`pl-10 pr-32 py-3 w-full bg-transparent text-white border border-white rounded-md focus:outline-none placeholder-gray-500
                  ${otpVerified ? 'border-green-400' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={otpSent && timer > 0 && !otpVerified || otpVerified}
              />
              <button
                type="button"
                onClick={handleOtpSend}
                disabled={otpSent && timer > 0 && !otpVerified || otpVerified}
                className={`absolute right-2 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200
                  ${(otpSent && timer > 0 && !otpVerified) || otpVerified
                    ? 'bg-gray-500 cursor-not-allowed opacity-70'
                    : 'bg-green-600 hover:bg-green-700'}`}
              >
                {otpSent ? (timer > 0 && !otpVerified ? `Resend in ${timer}s` : "Resend OTP") : "Verify Email"}
              </button>
            </div>

            {/* OTP Input Section */}
            {otpSent && !otpVerified && (
              <div className="mt-4 flex justify-between gap-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    id={`otp-${i}`}
                    value={otp[i] || ''}
                    className="w-10 h-12 text-center text-white bg-transparent border border-white rounded-md text-lg focus:outline-none"
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !e.target.value && i > 0) {
                            otpInputRefs.current[i - 1]?.focus();
                        }
                    }}
                    onPaste={handleOtpPaste}
                    ref={(el) => (otpInputRefs.current[i] = el)}
                    disabled={otpVerified}
                  />
                ))}
              </div>
            )}
            {otpVerified && (
              <p className="text-green-400 text-center mt-2">Email Verified!</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-white block mb-2 text-start">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="pl-10 pr-10 py-3 w-full bg-transparent text-white border border-white rounded-md focus:outline-none placeholder-gray-500"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={!otpVerified}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/3 text-gray-400 hover:text-white"
                disabled={!otpVerified}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white block mb-2 text-start">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="pl-10 pr-10 py-3 w-full bg-transparent text-white border border-white rounded-md focus:outline-none placeholder-gray-500"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={!otpVerified}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/3 text-gray-400 hover:text-white"
                disabled={!otpVerified}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Driver Specific Fields (Conditional Rendering) */}
          {userType === 'driver' && (
            <>
              {/* Vehicle Number */}
              <div>
                <label className="text-white block mb-2 text-start">Vehicle Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FaCar />
                  </span>
                  <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="e.g., DL1C AB1234"
                    className="pl-10 pr-4 py-3 w-full bg-transparent text-white border border-white rounded-md focus:outline-none placeholder-gray-500"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    required={userType === 'driver'}
                    disabled={!otpVerified}
                  />
                </div>
              </div>

              {/* Vehicle Model/Name */}
              <div>
                <label className="text-white block mb-2 text-start">Vehicle Model / Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FaCar />
                  </span>
                  <input
                    type="text"
                    name="vehicleModel"
                    placeholder="e.g., Tata Nexon EV"
                    className="pl-10 pr-4 py-3 w-full bg-transparent text-white border border-white rounded-md focus:outline-none placeholder-gray-500"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    required={userType === 'driver'}
                    disabled={!otpVerified}
                  />
                </div>
              </div>

              {/* Driving License */}
              <div>
                <label className="text-white block mb-2 text-start">Driving License Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FaIdCardAlt />
                  </span>
                  <input
                    type="text"
                    name="drivingLicense"
                    placeholder="e.g., ABCDE1234567890"
                    className="pl-10 pr-4 py-3 w-full bg-transparent text-white border border-white rounded-md focus:outline-none placeholder-gray-500"
                    value={formData.drivingLicense}
                    onChange={handleChange}
                    required={userType === 'driver'}
                    disabled={!otpVerified}
                  />
                </div>
              </div>
            </>
          )}

          {/* Terms */}
          <div className="flex items-start text-gray-300 text-sm gap-3">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="h-5 w-5 mt-1 rounded-sm appearance-none border border-gray-500 checked:bg-green-600 checked:border-transparent focus:outline-none transition-colors duration-200 cursor-pointer"
              required
              disabled={!otpVerified}
            />
            <label className="leading-tight mt-1">
              I agree to the{" "}
              <a href="#" className="text-green-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-500 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
  type="submit"
  className={`relative w-full py-3 rounded-md text-lg font-medium shadow-lg transition-colors duration-200 group
    ${!otpVerified ? 'bg-[#166534] cursor-not-allowed text-white ' : 'bg-[#166534] text-white'}`}
  disabled={!otpVerified}
>
  {/* Overlay for hover effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-[#114d2a] to-[#166534] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-md z-0"></span>
  {/* Button text */}
  <span className="relative z-10">Create Account</span>
</button>

          {/* Sign In */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <a href="#" className="text-green-500 hover:underline">
              Sign in →
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}