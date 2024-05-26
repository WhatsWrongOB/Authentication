import React, { useState } from 'react'
import axios from 'axios'
import '../styles/login.css'
import vite from '/public/vite.svg'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { LogInSuccess } from '../redux/userSlice'
import { useDispatch } from 'react-redux';


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      dispatch(LogInSuccess(data.userData))
      return data.success;
    } catch (error) {
      console.log(error.message)
      return false
    }
  }


  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const success = await handleLogin(email, password)
      if (success) {
        toast.success('Logged In Successfully')
        navigate('/')
      }
      else {
        toast.error('Incorrect email or password')
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
            <span>Login</span>
          </div>
          <p> You can sign in with your email and password or with Google</p>
        </div>
      </div>
      <div className="form_right">
        <form onSubmit={handleLoginForm}>
          <label htmlFor="email" className='email'>Your email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className='password'>Your password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type='submit' className='login_btn' disabled={loading}>{
            loading ? "processing..." : "Login"
          }</button>
        </form>
        <OAuth />
        <p>Don't have an account ? <Link to='/register'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login