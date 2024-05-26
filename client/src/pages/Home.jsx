import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import PostCard from '../components/PostCard'

const Home = () => {

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

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <main className="home">
      <div className="home_upper_container">
        <div className="home_content">
          <h1>Welcome to my Blog</h1>
          <p>Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.
          </p>
          <Link to='/'><p className='view_link'>view all posts</p></Link>
        </div>
      </div>
      <div className="home_lower_container">
        <h1>Recent Posts</h1>
        <div className="post_container">
          {
            post.map((item) => (
              <PostCard post={item} key={item.id} />
            ))
          }

        </div>
        <Link to='/'><p className='all_post'>view all post</p></Link>
      </div>
    </main>
  )
}

export default Home