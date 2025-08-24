import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';
import styles from './Login.module.css'; // Import the CSS module

const LoginForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modalOverlay}
      onClick={onClose}
    >
      {/* Login Form */}
      <div 
        className={styles.loginForm}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Close Button */}
        <div className={styles.modalHeader}>
          <h4 className="mb-0">Login</h4>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label className={`${styles.formLabel} form-label fw-medium`}>Email Address</label>
              <div className="input-group">
                <span className={`${styles.inputGroupText} input-group-text`}>
                  <FaEnvelope style={{ color: 'white' }} />
                </span>
                <input
                  type="email"
                  name="email"
                  className={`${styles.formControl} form-control`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="mb-4">
              <label className={`${styles.formLabel} form-label fw-medium`}>Password</label>
              <div className="input-group">
                <span className={`${styles.inputGroupText} input-group-text`}>
                  <FaLock style={{ color: 'white' }} />
                </span>
                <input
                  type="password"
                  name="password"
                  className={`${styles.formControl} form-control`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  className={`${styles.formCheckInput} form-check-input`} 
                  id="rememberMe" 
                />
                <label className={`${styles.formCheckLabel} form-check-label`} htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className={styles.warningLink}>Forgot password?</a>
            </div>
            
            {/* Submit Button */}
            <div className="d-grid">
              <button 
                type="submit" 
                className={`${styles.warningButton} btn`}
              >
                Login
              </button>
            </div>
          </form>
          
          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="mb-0">Don't have an account? <a href="#" className={styles.warningLink}>Register</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;