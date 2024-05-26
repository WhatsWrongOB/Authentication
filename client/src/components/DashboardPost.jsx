import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/dashboard.css'
import { FaBitbucket } from 'react-icons/fa'
import { toast } from 'react-toastify'

const DashboardPost = () => {

    const [post, setPost] = useState([])
    console.log(post)
    const fetchPost = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/post/')
            setPost(data.post)
        } catch (error) {
            console.log(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/post/${id}`);
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchPost()
    }, [post])
    return (
        <div className="recent_post_container">
            <h3 className='user_heading'>Recent Posts</h3>
            {
                post.map((post) => (
                    <div className="recent_post_content">
                        <img src={post.heroPicture} alt="pic" />
                        <p>{post.title}</p>
                        <FaBitbucket color='red' className='delete_icon' onClick={() => deletePost(post._id)} />
                    </div>
                ))
            }
        </div>
    )
}

export default DashboardPost