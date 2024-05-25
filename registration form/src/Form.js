
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const countries = ['India', 'USA', 'Canada', 'Nepal', 'Russia'];
  const cities = {
    India: ['Delhi', 'Mumbai', 'Bangalore'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', '	Quebec City', '	Edmonton'],
    Nepal : ['Kathmandu', 'Pokhara', 'Birgunj'],
    Russia : ['Moscow','Saint Petersburg','Kazan']
  };

  useEffect(() => {
    setIsFormValid(Object.keys(errors).length === 0 && Object.values(formData).every(field => field !== ''));
  }, [errors, formData]);

  const validateField = (name, value) => {
    let error;
    switch (name) {
      case 'firstName':
        if (!value) error = 'First Name is required';
        break;
      case 'lastName':
        if (!value) error = 'Last Name is required';
        break;
      case 'username':
        if (!value) error = 'Username is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        break;
      case 'countryCode':
        if (!value) error = 'Country Code is required';
        break;
      case 'phoneNumber':
        if (!value) error = 'Phone Number is required';
        break;
      case 'country':
        if (!value) error = 'Country is required';
        break;
      case 'city':
        if (!value) error = 'City is required';
        break;
      case 'panNo':
        if (!value) error = 'Pan Number is required';
        break;
      case 'aadharNo':
        if (!value) error = 'Aadhar Number is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors(prevErrors => {
      if (error) {
        return { ...prevErrors, [name]: error };
      } else {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigate('/success', { state: { formData } });
    }
  };

  const validate = () => {
    const newErrors = {};
    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    }
    return newErrors;
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="password-toggle-button btnp"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span className="error ">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <div className="phone-input">
            <input
              type="text"
              name="countryCode"
              placeholder="Country Code"
              value={formData.countryCode}
              onChange={handleChange}
              style={{ width: '30%' }}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{ width: '70%' }}
            />
          </div>
          {errors.countryCode && <span className="error">{errors.countryCode}</span>}
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <div className="form-group">
          <label>City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country}
          >
            <option value="">Select City</option>
            {formData.country &&
              cities[formData.country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>PAN Number:</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
          />
          {errors.panNo && <span className="error">{errors.panNo}</span>}
        </div>
        <div className="form-group">
          <label>Aadhar Number:</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
          />
          {errors.aadharNo && <span className="error">{errors.aadharNo}</span>}
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
