import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../styles/home.css'

const PostPage = () => {

  const { id } = useParams();

  const [post, setPost] = useState([])

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/post/query?id=${id}`)
      console.log(data)
      setPost(data.post)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <div className='post_page'>
      <img src={post.heroPicture} alt="" />
      <h1>{post.title}</h1>
      <h2>{post.content}</h2>
    </div>
  )
}

export default PostPage