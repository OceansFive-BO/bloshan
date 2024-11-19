import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: '',
    address: '',
    preferredContact: 'email',
    profilePhoto: null,
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePhoto: objectUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    // Validation
    if (!formData.username) newErrors.push('Username is required.');
    if (formData.username.length > 60)
      newErrors.push('Username must be 60 characters or less.');
    if (!formData.password) newErrors.push('Password is required.');
    if (formData.password !== formData.confirmPassword)
      newErrors.push('Passwords do not match.');
    if (!formData.firstName) newErrors.push('First name is required.');
    if (formData.firstName.length > 60)
      newErrors.push('First name must be 60 characters or less.');
    if (!formData.lastName) newErrors.push('Last name is required.');
    if (formData.lastName.length > 60)
      newErrors.push('Last name must be 60 characters or less.');
    if (!formData.email) newErrors.push('Email is required.');
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.push('Invalid email format.');
    if (!formData.birthday) newErrors.push('Birthday is required.');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      username: formData.username,
      password: formData.password,
      firstname: formData.firstName,
      lastname: formData.lastName,
      phone: formData.phone || null,
      email: formData.email,
      address: formData.address || null,
      birth_date: formData.birthday,
      preferred_contact: formData.preferredContact,
      photo_url: formData.profilePhoto || null,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/users/',
        userData
      );
      console.log('User created successfully:', response.data);

      setErrors([]);
      setSuccessMessage('Thank you for signing up!');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/profile');
      }, 5000);
    } catch (error) {
      console.error('Error creating user:', error);
      setErrors([
        'An error occurred while creating the account. Please try again.',
      ]);
    }
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="form-group">
          <label>Username*:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password*:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label>Confirm Password*:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        {/* First Name */}
        <div className="form-group">
          <label>First Name*:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name*:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email*:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Birthday */}
        <div className="form-group">
          <label>Birthday*:</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        {/* Preferred Contact */}
        <div className="form-group">
          <label>Preferred Contact:</label>
          <div>
            <label>
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleInputChange}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                name="preferredContact"
                value="text"
                checked={formData.preferredContact === 'text'}
                onChange={handleInputChange}
              />
              Text
            </label>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="form-group">
          <label>Upload Profile Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {formData.profilePhoto && (
            <img
              src={formData.profilePhoto}
              alt="Profile Thumbnail"
              className="thumbnail"
            />
          )}
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="error-messages">
            <p>You must fix the following:</p>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
