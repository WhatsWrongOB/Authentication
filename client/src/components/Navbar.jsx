import React, { useState } from 'react';
import Hamburger from 'hamburger-react'
import axios from 'axios'
import '../styles/Navbar.css';
import vite from '/public/vite.svg';
import profile from '/public/profile.png'
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaKey } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../redux/userSlice'


const Navbar = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [hamburgerClicked, setHamburgerClicked] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdmin = currentUser ? currentUser.isAdmin : false;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const hamburgerClick = () => {
    setHamburgerClicked(!hamburgerClicked)
  }

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/auth/logout');
      if (data.success) {
        dispatch(logOut())
        toast.success(data.message)
        navigate('/login')
      }
      else {
        toast.error('Server Error')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <div className="logo">
          <img src={vite} alt="logo" />
          <span>Blog</span>
        </div>
        <ul className="menu">
          <div className="inner_menu">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            {
              isAdmin ? <li><Link to='/dashboard'>Dashboard</Link></li> : null
            }
          </div>
          {
            currentUser ? (
              <li className='profile-container' onClick={toggleDropdown}>
                <span className='username'
                >{currentUser.username}
                  <div className='line'></div>
                </span>
                <img className='profile_img' src={currentUser.profilePicture || profile} alt='profile' />
                {isDropdownOpen && (
                  <ul className='dropdown-menu'>
                    <li>{currentUser.email}</li>
                    <li><Link to='/profile' className='dropdown_link'><FaUser size={12} />Profile</Link></li>
                    <li><Link to='/security' className='dropdown_link'><FaKey size={12} />Security</Link></li>
                    <li onClick={handleLogOut} className='dropdown_link'><FaSignOutAlt size={12} />Logout</li>
                  </ul>
                )}
              </li>
            ) : (
              <li><Link to='/login'><FaUser size={19} /> </Link></li>
            )
          }
          <span className='hamburger'>
            <Hamburger size={20} />
          </span>
        </ul>
      </nav>
      <hr className='hr' />
    </>
  );
};

export default Navbar;
