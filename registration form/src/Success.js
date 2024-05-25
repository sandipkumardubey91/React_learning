
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  return (
    <div className="success-container">
      <h1>Form Submitted Successfully</h1>
      {formData && (
        <div className="success-details">
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong>{formData.countryCode} {formData.phoneNumber}</p>
          <p><strong>Country:</strong> {formData.country}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>PAN Number:</strong> {formData.panNo}</p>
          <p><strong>Aadhar Number:</strong> {formData.aadharNo}</p>
        </div>
      )}
      <button onClick={() => navigate('/')}>Go Back to Form</button>
    </div>
  );
};

export default Success;
