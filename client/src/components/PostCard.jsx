import React from 'react'
import '../styles/home.css'
import { Link, useParams } from 'react-router-dom'


const PostCard = ({ post }) => {

    return (
        <Link to={`/post/${post._id}`} >
            <div className="postcard">
                <img src={post.heroPicture} alt="post" />
                <div className="postcard_content">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard