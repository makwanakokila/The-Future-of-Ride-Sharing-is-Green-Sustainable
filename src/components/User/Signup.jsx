// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaCar } from 'react-icons/fa'; // Import FaCar for driver
// import { Link, useNavigate } from 'react-router-dom';

// const SignUp = () => {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [error, setError] = useState("");
//     const [userType, setUserType] = useState('normal'); // Default to normal user

//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleUserTypeChange = (e) => {
//         setUserType(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { fullName, email, phone, password, confirmPassword } = formData;

//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//         if (!email.trim()) {
//             setError("Email is required");
//             return;
//         }

//         if (!emailRegex.test(email)) {
//             setError("Enter a valid email");
//             return;
//         }

//         if (!password || !confirmPassword) {
//             setError("Password and Confirm Password are required");
//             return;
//         }

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
//             // const baseUrl = 'https://idharudhar-backend-2.onrender.com/api/auth';
//             // // Corrected: Use backticks () for template literals
//             // const signupUrl = userType === 'driver' ? ${baseUrl}/driver/signup : ${baseUrl}/signup;
//             // const otpUrl = userType === 'driver' ? ${baseUrl}/driver/send-otp : ${baseUrl}/send-otp;

//             // IMPORTANT: You are currently hardcoding the signup URL.
//             // You need to use the 'signupUrl' variable you just defined.
//             // Also, your 'send-otp' call is hardcoded. It should use 'otpUrl'.

//             // Current incorrect lines:
//             // const response = await axios.post( 'https://idharudhar-backend-2.onrender.com/api/auth/signup', {
//             // await axios.post( 'https://idharudhar-backend-2.onrender.com/api/auth/send-otp', { email });

//             // Corrected axios calls:
//             const baseUrl = 'https://idharudhar-backend-2.onrender.com/api/auth';
// const signupUrl = userType === 'driver' ? `${baseUrl}/driver/signup` : `${baseUrl}/signup`;
// const otpUrl = userType === 'driver' ? `${baseUrl}/driver/send-otp` : `${baseUrl}/send-otp`;

//             const response = await axios.post(signupUrl, {
//                 name: fullName,
//                 email,
//                 phone,
//                 password,
//                 confirmPassword,
//                 userType: userType, // Include userType in the request
//             });

//             await axios.post(otpUrl, { email });

//             alert("Signup successful! OTP sent to your email.");
//             console.log(response.data);
//             setError("");

//             // Route user based on usertype after successful signup.
//             if (userType === 'driver') {
//                 navigate("/SignupPage"); // Or "/driver/dashboard" , decide where you want to send the driver
//             } else {
//                 navigate("/otpverification", { state: { email } });
//             }

//         } catch (error) {
//             console.error("Signup error:", error); // Added a more descriptive log
//             setError(error.response?.data?.message || "Signup failed! Please try again.");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
//             <div className="max-w-md w-full bg-white dark:bg-[#0F141B] shadow-md rounded-lg p-8">
//                 <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-1">
//                     Create a GreenGlide Account
//                 </h2>
//                 <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
//                     Sign up to access eco-friendly transportation options
//                 </p>

//                 <form onSubmit={handleSubmit}>
//                     {/* Error Message */}
//                     {error && (
//                         <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//                     )}

//                     {/* User Type Selection */}
//                     <div className="mb-4">
//                         <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200 text-start">
//                             I am a:
//                         </label>
//                         <div className="flex">
//                             <label className="inline-flex items-center mr-4">
//                                 <input
//                                     type="radio"
//                                     className="form-radio h-5 w-5 text-green-600"
//                                     value="normal"
//                                     checked={userType === 'normal'}
//                                     onChange={handleUserTypeChange}
//                                 />
//                                 <span className="ml-2 text-gray-700 dark:text-gray-200">Normal User</span>
//                             </label>
//                             <label className="inline-flex items-center">
//                                 <input
//                                     type="radio"
//                                     className="form-radio h-5 w-5 text-green-600"
//                                     value="driver"
//                                     checked={userType === 'driver'}
//                                     onChange={handleUserTypeChange}
//                                 />
//                                 <span className="ml-2 text-gray-700 dark:text-gray-200 flex items-center">
//                                     <FaCar className="mr-1" /> {/* Driver Icon */}
//                                     Driver
//                                 </span>
//                             </label>
//                         </div>
//                     </div>

//                     {/* Full Name */}
//                     <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Full Name</label>
//                     <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
//                         <FaUser className="text-gray-400 dark:text-gray-300 mr-2" />
//                         <input
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             placeholder="John Doe"
//                             className="w-full bg-transparent text-black dark:text-white outline-none"
//                         />
//                     </div>

//                     {/* Email */}
//                     <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Email Address</label>
//                     <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
//                         <FaEnvelope className="text-gray-400 dark:text-gray-300 mr-2" />
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="john@example.com"
//                             className="w-full bg-transparent text-black dark:text-white outline-none"
//                         />
//                     </div>

//                     {/* Phone */}
//                     <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Phone Number</label>
//                     <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
//                         <FaPhone className="text-gray-400 dark:text-gray-300 mr-2" />
//                         <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             placeholder="+1 (555) 123-4567"
//                             className="w-full bg-transparent text-black dark:text-white outline-none"
//                         />
//                     </div>

//                     {/* Password */}
//                     <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Password</label>
//                     <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
//                         <FaLock className="text-gray-400 dark:text-gray-300 mr-2" />
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="••••••••"
//                             className="w-full bg-transparent text-black dark:text-white outline-none"
//                         />
//                         <button type="button" onClick={() => setShowPassword(!showPassword)}>
//                             {showPassword ? <FaEyeSlash className="text-gray-500 dark:text-gray-300" /> : <FaEye className="text-gray-500 dark:text-gray-300" />}
//                         </button>
//                     </div>

//                     {/* Confirm Password */}
//                     <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Confirm Password</label>
//                     <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
//                         <FaLock className="text-gray-400 dark:text-gray-300 mr-2" />
//                         <input
//                             type={showConfirmPassword ? 'text' : 'password'}
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             placeholder="••••••••"
//                             className="w-full bg-transparent text-black dark:text-white outline-none"
//                         />
//                         <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                             {showConfirmPassword ? <FaEyeSlash className="text-gray-500 dark:text-gray-300" /> : <FaEye className="text-gray-500 dark:text-gray-300" />}
//                         </button>
//                     </div>

//                     {/* Terms */}
//                     <div className="flex items-start mb-6">
//                         <input type="checkbox" className="mr-2 mt-1" required />
//                         <label className="text-sm text-gray-700 dark:text-gray-300">
//                             I agree to the <span className="text-green-600 dark:text-green-400">Terms of Service</span> and <span className="text-green-600 dark:text-green-400">Privacy Policy</span>
//                         </label>
//                     </div>

//                     <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
//                         Create Account
//                     </button>
//                 </form>

//                 <div className="text mt-4 text-center dark:text-gray-500">
//                     <p>
//                         Already have an account? <Link to='/login' className="text-green-600 font-semibold cursor-pointer">Sign in →</Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;



import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaCar, FaIdCard, FaFileAlt, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    // Corrected: Renamed setShowConfirm1Password to setShowConfirmPassword
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [userType, setUserType] = useState('normal');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        // --- NEW: Driver-specific fields added to state ---
        vehicleNumber: '',
        vehicleModel: '',
        operatingLocation: '',
        monthlyEarningGoal: '',
        licenseNumber: '',
        aadhaarNumber: '',
        panNumber: '',
        licensePhoto: null,
        aadhaarPhoto: null,
        panPhoto: null,
        vehiclePhoto: null
        // --- END NEW ---
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- NEW: handleFileChange for file inputs ---
    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };
    // --- END NEW ---

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        // Optionally clear driver-specific fields when switching back to normal user
        if (e.target.value === 'normal') {
            setFormData(prevData => ({
                ...prevData,
                vehicleNumber: '',
                vehicleModel: '',
                operatingLocation: '',
                monthlyEarningGoal: '',
                licenseNumber: '',
                aadhaarNumber: '',
                panNumber: '',
                licensePhoto: null,
                aadhaarPhoto: null,
                panPhoto: null,
                vehiclePhoto: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fullName, email, phone, password, confirmPassword } = formData;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Enter a valid email");
            return;
        }

        if (!password || !confirmPassword) {
            setError("Password and Confirm Password are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // --- NEW: Additional validation for drivers ---
        if (userType === 'driver') {
            const { vehicleNumber, vehicleModel, operatingLocation, licenseNumber, aadhaarNumber, panNumber, licensePhoto, aadhaarPhoto, panPhoto, vehiclePhoto } = formData;
            
            if (!vehicleNumber || !vehicleModel || !operatingLocation || !licenseNumber || !aadhaarNumber || !panNumber) {
                setError("All driver fields are required");
                return;
            }
            if (!licensePhoto || !aadhaarPhoto || !panPhoto || !vehiclePhoto) {
                setError("All driver document photos are required");
                return;
            }
        }
        // --- END NEW ---

        try {
            // --- NEW: Use FormData for file uploads ---
            const formDataToSend = new FormData();
            formDataToSend.append('name', fullName);
            formDataToSend.append('email', email);
            formDataToSend.append('phone', phone);
            formDataToSend.append('password', password);
            formDataToSend.append('confirmPassword', confirmPassword);
            formDataToSend.append('userType', userType);

            if (userType === 'driver') {
                formDataToSend.append('vehicleNumber', formData.vehicleNumber);
                formDataToSend.append('vehicleModel', formData.vehicleModel);
                formDataToSend.append('operatingLocation', formData.operatingLocation);
                formDataToSend.append('monthlyEarningGoal', formData.monthlyEarningGoal);
                formDataToSend.append('licenseNumber', formData.licenseNumber);
                formDataToSend.append('aadhaarNumber', formData.aadhaarNumber);
                formDataToSend.append('panNumber', formData.panNumber);
                
                if (formData.licensePhoto) formDataToSend.append('licensePhoto', formData.licensePhoto);
                if (formData.aadhaarPhoto) formDataToSend.append('aadhaarPhoto', formData.aadhaarPhoto);
                if (formData.panPhoto) formDataToSend.append('panPhoto', formData.panPhoto);
                if (formData.vehiclePhoto) formDataToSend.append('vehiclePhoto', formData.vehiclePhoto);
            }
            // --- END NEW ---

            const baseUrl = 'https://idharudhar-backend-2.onrender.com/api/auth';
            const signupUrl = userType === 'driver' ? `${baseUrl}/driver/signup` : `${baseUrl}/signup`;
            const otpUrl = userType === 'driver' ? `${baseUrl}/driver/send-otp` : `${baseUrl}/send-otp`;

            // --- IMPORTANT: When sending FormData, set 'Content-Type' to 'multipart/form-data' ---
            const response = await axios.post(signupUrl, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });
            // --- END IMPORTANT ---

            await axios.post(otpUrl, { email });

            alert("Signup successful! OTP sent to your email.");
            console.log(response.data);
            setError("");

            if (userType === 'driver') {
                navigate("/auth"); // Redirect to a page after driver registration (e.g., driver dashboard or login)
            } else {
                navigate("/otpverification", { state: { email } });
            }

        } catch (error) {
            console.error("Signup error:", error);
            setError(error.response?.data?.message || "Signup failed! Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white dark:bg-[#0F141B] shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-1">
                    Create a IdharUdhar Account
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
                    Sign up to access eco-friendly transportation options
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    {/* User Type Selection */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200 text-start">
                            I am a:
                        </label>
                        <div className="flex">
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-green-600"
                                    value="normal"
                                    checked={userType === 'normal'}
                                    onChange={handleUserTypeChange}
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-200">Normal User</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-green-600"
                                    value="driver"
                                    checked={userType === 'driver'}
                                    onChange={handleUserTypeChange}
                                />
                                <span className="ml-2 text-gray-700 dark:text-gray-200 flex items-center">
                                    <FaCar className="mr-1" /> {/* Driver Icon */}
                                    Driver
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Full Name */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Full Name</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaUser className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Email Address</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaEnvelope className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Phone Number</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaPhone className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Password</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaLock className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash className="text-gray-500 dark:text-gray-300" /> : <FaEye className="text-gray-500 dark:text-gray-300" />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Confirm Password</label>
                    <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                        <FaLock className="text-gray-400 dark:text-gray-300 mr-2" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                            required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash className="text-gray-500 dark:text-gray-300" /> : <FaEye className="text-gray-500 dark:text-gray-300" />}
                        </button>
                    </div>

                    {/* --- NEW: Conditionally rendered driver fields --- */}
                    {userType === 'driver' && (
                        <>
                            <div className="border-t border-gray-300 dark:border-gray-600 my-4 pt-4">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
                                    <FaCar className="mr-2" /> Driver Information
                                </h3>

                                {/* Vehicle Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Vehicle Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaCar className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="vehicleNumber"
                                        value={formData.vehicleNumber}
                                        onChange={handleChange}
                                        placeholder="DL 01 AB 1234"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                        required
                                    />
                                </div>

                                {/* Vehicle Model */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Vehicle Model</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaCar className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="vehicleModel"
                                        value={formData.vehicleModel}
                                        onChange={handleChange}
                                        placeholder="Toyota Prius 2020"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                        required
                                    />
                                </div>

                                {/* Operating Location */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Operating Location</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaMapMarkerAlt className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="operatingLocation"
                                        value={formData.operatingLocation}
                                        onChange={handleChange}
                                        placeholder="New Delhi, India"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                        required
                                    />
                                </div>

                                {/* Monthly Earning Goal */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Monthly Earning Goal (₹)</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaMoneyBillWave className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="number"
                                        name="monthlyEarningGoal"
                                        value={formData.monthlyEarningGoal}
                                        onChange={handleChange}
                                        placeholder="50000"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                        required
                                    />
                                </div>

                                {/* License Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Driver's License Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaIdCard className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleChange}
                                        placeholder="DL-1234567890123"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                        required
                                    />
                                </div>

                                {/* License Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Driver's License Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="licensePhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                        required
                                    />
                                </div>

                                {/* Aadhaar Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Aadhaar Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaIdCard className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="aadhaarNumber"
                                        value={formData.aadhaarNumber}
                                        onChange={handleChange}
                                        placeholder="1234 5678 9012"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                        required
                                    />
                                </div>

                                {/* Aadhaar Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Aadhaar Card Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="aadhaarPhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                        required
                                    />
                                </div>

                                {/* PAN Number */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">PAN Number</label>
                                <div className="flex items-center mb-4 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-black">
                                    <FaFileAlt className="text-gray-400 dark:text-gray-300 mr-2" />
                                    <input
                                        type="text"
                                        name="panNumber"
                                        value={formData.panNumber}
                                        onChange={handleChange}
                                        placeholder="ABCDE1234F"
                                        className="w-full bg-transparent text-black dark:text-white outline-none"
                                        required
                                    />
                                </div>

                                {/* PAN Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">PAN Card Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="panPhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                        required
                                    />
                                </div>

                                {/* Vehicle Photo Upload */}
                                <label className="block mb-2 text-sm text-gray-700 dark:text-gray-200 text-start">Vehicle Photo</label>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        name="vehiclePhoto"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-700
                                          hover:file:bg-green-100
                                          dark:file:bg-green-900 dark:file:text-green-100
                                          dark:hover:file:bg-green-800"
                                        accept="image/*"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {/* --- END NEW --- */}

                    {/* Terms */}
                    <div className="flex items-start mb-6">
                        <input type="checkbox" className="mr-2 mt-1" required />
                        <label className="text-sm text-gray-700 dark:text-gray-300">
                            I agree to the <span className="text-green-600 dark:text-green-400">Terms of Service</span> and <span className="text-green-600 dark:text-green-400">Privacy Policy</span>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
                        Create Account
                    </button>
                </form>

                <div className="text mt-4 text-center dark:text-gray-500">
                    <p>
                        Already have an account? <Link to='/login' className="text-green-600 font-semibold cursor-pointer">Sign in →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;