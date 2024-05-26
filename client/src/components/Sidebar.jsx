import React from 'react'
import '../styles/dashboard.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice';
import { Link } from 'react-router-dom'
import { FaUser, FaSignOutAlt, FaCommentAlt, FaAccusoft } from 'react-icons/fa'

const Sidebar = () => {

    const dispatch = useDispatch()

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

    return (
        <div className="sidebar">
            <ul className="sidebar_menu">
                <li><Link className='sidebar_link' to='/dashboard'><FaAccusoft />Dashboard</Link></li>
                <li><Link className='sidebar_link' to='/profile'><FaUser />Profile</Link></li>
                <li><Link className='sidebar_link' to='/dashboard/posts'><FaAccusoft />Posts</Link></li>
                <li><Link className='sidebar_link' to='/dashboard/comment'><FaCommentAlt />Comments</Link></li>
                <li><Link className='sidebar_link' to='/dashboard/users'><FaUser /> Users</Link></li>
                <li><span className='sidebar_link' onClick={handleLogOut}><FaSignOutAlt />LogOut</span> </li>

            </ul>
        </div>
    )
}

export default Sidebar