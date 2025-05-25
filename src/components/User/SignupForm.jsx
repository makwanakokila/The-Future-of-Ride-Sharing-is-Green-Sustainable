import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import FormInput from './ui/FormInput';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVerifyOTP = () => {
    alert('OTP verification code sent!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Service & Privacy Policy');
      return;
    }
    console.log('Form submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5">
        <FormInput
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          icon={<User size={18} className="text-gray-400" />}
        />

        <div className="relative">
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            value={formData.email}
            onChange={handleChange}
            icon={<Mail size={18} className="text-gray-400" />}
          >
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="absolute right-3 top-[2.1rem] bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-3 rounded-md transition-colors"
            >
              Verify OTP
            </button>
          </FormInput>
        </div>

        <FormInput
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
          icon={<Lock size={18} className="text-gray-400" />}
        >
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[2.1rem] text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </FormInput>

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="********"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={<Lock size={18} className="text-gray-400" />}
        >
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-[2.1rem] text-gray-400 hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </FormInput>

        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 accent-green-500 focus:ring-green-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-300">
              I agree to the{' '}
              <a href="#" className="text-green-500 hover:text-green-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-green-500 hover:text-green-400">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!formData.agreeToTerms}
        className={`w-full py-3 px-4 mt-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-medium rounded-md shadow-sm transition-colors ${
          !formData.agreeToTerms ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
