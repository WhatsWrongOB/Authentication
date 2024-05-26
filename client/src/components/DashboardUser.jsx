import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/dashboard.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { FaBitbucket } from 'react-icons/fa'

const DashboardUser = () => {

    const [userData, setUserData] = useState([])
    console.log(userData.length)
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/profile/users')
            setUserData(data.users)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [userData])

    const deleteUser = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/profile/${id}`);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="dash_user">
            <h3 className='user_heading'>Recent user</h3>
            <Link className='link_view' to='/dashboard/users'>view all</Link>
            <div className="image_heading">
                <p>User Image</p>
                <p>Username</p>
            </div>
            {
                userData.map((user, index) => (
                    <div className="dash_login_user" key={user._id}>
                        <img src={user.profilePicture} alt="profile_pic" />
                        <h4 className='dash_username'>{user.username}</h4>
                        <FaBitbucket color='red' className='delete_icon' onClick={() => deleteUser(user._id)} />
                    </div>
                ))
            }

        </div>
    )
}

export default DashboardUser