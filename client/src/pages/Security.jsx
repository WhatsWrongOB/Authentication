import React, { useState } from 'react';
import '../styles/login.css';
import vite from '/public/vite.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Security = () => {
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [rePass, setRePass] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleResetPass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `http://localhost:5000/auth/reset/${currentUser._id}`,
        {
          curPass,
          newPass,
          rePass,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(data)

      if (data.success) {
        toast.success(data.message);
        setCurPass('');
        setNewPass('');
        setRePass('');
      } 
    } catch (error) {
      toast.error('Incorrect Credentials'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <div className="form_left">
        <div className="form_left_content">
          <div className="logo form_logo">
            <img src={vite} alt="" />
            <span>Reset Password</span>
          </div>
        </div>
      </div>
      <div className="form_right">
        <form onSubmit={handleResetPass}>
          <label htmlFor="username" className="email">
            Current Password
            <input
              type="password" // Use type="password" for sensitive information
              value={curPass}
              onChange={(e) => setCurPass(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email" className="email">
            New Password
            <input
              type="password" // Use type="password" for sensitive information
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </label>
          <label htmlFor="message" className="password">
            Re Type Password
            <input
              type="password" 
              value={rePass}
              onChange={(e) => setRePass(e.target.value)}
              required
            />
          </label>
          <button disabled={loading} type="submit" className="login_btn">
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Security;
