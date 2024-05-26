import React, { useEffect, useRef, useState } from 'react';
import profile from '/public/profile.png';
import axios from 'axios';
import '../styles/profile.css';
import { logOut, deleteUserSuccess } from '../redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState((currentUser && currentUser.profilePicture) || '');
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [loading, setLoading] = useState(false)


  const handleLogOut = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/auth/logout');
      if (data.success) {
        dispatch(logOut());
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error('Server Error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true)
      const { data } = await axios.patch(
        `http://localhost:5000/profile/${currentUser._id}`,
        {
          username,
          email,
          profilePicture: image,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (data.success) {
        toast.success(`${data.message}, Login again to see changes`);
        dispatch(logOut())
        navigate('/login')
      } else {
        toast.error('Profile not updated');
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false)
    }
  };

  const handleProfileDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/profile/${currentUser._id}`);

      if (data.success) {
        dispatch(deleteUserSuccess())
        navigate('/login')
        toast.success(data.message);
      } else {
        toast.error('Profile not updated');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="profile">
      <div className="profile_container">
        <h2>Profile</h2>
        <input
          id='file'
          type='file'
          ref={fileRef}
          accept='image/*'
          onChange={handleImageChange}
        />
        <img
          src={image || profile}
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button disabled={loading} onClick={handleProfileUpdate}>
          {
            loading ? 'updating...' : 'Update'
          }
        </button>
        <div className="profile_option">
          <span onClick={handleProfileDelete}>Delete Account</span>
          <span onClick={handleLogOut}>Log Out</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;
