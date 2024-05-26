import React, { useState } from 'react'
import axios from 'axios'
import '../styles/login.css'
import vite from '/public/vite.svg'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleRegister = async (username, email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/auth/register', {
        username,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return data.success;
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const success = await handleRegister(username, email, password)

      if (success) {
        toast.success('Registration Successfully')
        navigate('/login')
      }
      else {
        toast.error('Registration failed')
      }
    } catch (error) {
      console.log(error.messsage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form_container">
      <div className="form_left">
        <div className="form_left_content">
          <div className="logo form_logo">
            <img src={vite} alt="" />
            <span>Register</span>
          </div>
          <p> You can sign in with your email and password or with Google</p>
        </div>
      </div>
      <div className="form_right">
        <form onSubmit={handleRegisterForm}>
          <label htmlFor="username" className='email'>Your name
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email" className='email'>Your email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className='password'>Your password
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </label>
          <button disabled={loading} type='submit' className='login_btn'>{
            loading ? "processin..." : "Register"
          }</button>
        </form>
        <OAuth />
        <p>Don't have an account ? <Link to='/login'>Sign in</Link></p>
      </div>
    </div>
  )
}

export default Register