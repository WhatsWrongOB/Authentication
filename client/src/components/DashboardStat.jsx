import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/dashboard.css'

const DashboardStats = () => {

    const [userData, setUserData] = useState([])
    const [post, setPost] = useState([])

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/profile/users')
            setUserData(data.users)
        } catch (error) {
            console.log(error.message)
        }
    }

    console.log(post)
    const fetchPost = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/post/')
            setPost(data.post)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAllUsers()
        fetchPost()
    }, [])
    return (
        <>
            <div className="dash_likes">
                <div className="dash_likes_content">
                    <h3 className="dash_likes_heading">Total Users</h3>
                    <h5 className='dash_like_no'>{userData.length}</h5>
                    <h5 className='dash_month'>Obaid's Blog</h5>
                </div>
                <img src="data:image/png;base64,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" alt="user" />
            </div>
            <div className="dash_likes">
                <div className="dash_likes_content">
                    <h3 className="dash_likes_heading">Total Comment</h3>
                    <h5 className='dash_like_no'>19</h5>
                    <h5 className='dash_month'>Obaid's Blog</h5>
                </div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAYFBMVEX///8hISEAAADZ2dmkpKQICAgXFxf8/PxmZmYNDQ0dHR35+fkaGhoTExPj4+NjY2NGRkaWlpZdXV2EhIS9vb0mJibOzs6zs7NycnLv7+8rKyvp6elTU1M1NTWOjo5YWFj2MrOgAAACT0lEQVRoge2Y0daqIBBGc1QEFEUzy1J7/7c8IdiviFbCWueGfYnL7Wr4MGdOJ4/H45Gk4TU6xDVMP6hrTOAwBNc76oYDCixAwJst9xkyG7Ugg7NRnWCwVQugMJW+Um52tORM2au1u5RuArc6PER9AyLtpe4OpRuGT3naIR2UJNQu4PFHwV6WvqAe7QwvV3Nw4Z7skC8WB1EudrN1n043UQEyLNa4SHis1+oAYSzSzudLrXBTvnXHL3Aq7O1sZSw5Mx+uHzkzvehjEOPIhTyK9TB6uZd7uZd7uZd7uZd7uZf/PzlZdWFHKIkuz8UKKlzIC9Hgk/n3eXJ/9QP0YtEmTqQXYbon8zUsngdXe/lVFBgte8WxxaP3duOWr2lFCfSWMw3EIjO07b9RiY6IBlp9o7E7Jd3DRv3oxu4f9EynYycaoKw8rH+U2djjZzzRL+VqIkKgr7CkGNaGqMBmql4NLfTmfKQGKi9SpIjXwR8AbTHdbR4gNFSNYya0RL2OQ/FxmMToxpQrfy6HXLq87eIP6gyehppMpeEQI0rN8rxnO15KUQx8f6YSlkV/McobJH8WMcsvfVF+MfVIXqQrudpv+npHJEY+i98P0OXykAUZ25xKHpefpZsF2/t1VJ7e1Fyws36zreQpVwPD5w+F/VKe32UEN8a0VvImkBFcDzrt5e8IWs8c1/IpgshBBHX5FMHeRQQX8gxPEeROIriQv97sciuxg2+OOd3fy9dZBN+U778FdxF8k6hTSWN3Efyj7QBlCAKHEZxTY15FjrfS49niH4gRHc1TIbG8AAAAAElFTkSuQmCC" alt="comment" />
            </div>
            <div className="dash_likes">
                <div className="dash_likes_content">
                    <h3 className="dash_likes_heading">Total Posts</h3>
                    <h5 className='dash_like_no'>{post.length}</h5>
                    <h5 className='dash_month'>Obaid's Blog</h5>
                </div>
                <img src="data:image/png;base64,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" alt="post" />
            </div>
        </>
    )
}

export default DashboardStats