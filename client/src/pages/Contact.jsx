import React, { useState } from 'react'
import '../styles/login.css'
import vite from '/public/vite.svg'
import axios from 'axios'
import { toast } from 'react-toastify'


const Contact = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)


  const handleContact = async (username, email, message) => {
    try {
      const { data } = await axios.post('http://localhost:5000/contact/', {
        username,
        email,
        message
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

  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const success = await handleContact(username, email, message)
      if (success) {
        toast.success('Message Sent Successfully')
        setUsername('')
        setEmail('')
        setMessage('')
        setLoading(false)
      }
      else {
        toast.error('Message not sent, Network Error')
      }
    } catch (error) {
      console.log(error.message)
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
            <span>Contact us</span>
          </div>
        </div>
      </div>
      <div className="form_right">
        <form onSubmit={handleContactForm}>
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
          <label htmlFor="message" className='password'>Your message
            <input type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <button disabled={loading} type='submit' className='login_btn'>{
            loading ? "Sending..." : "Send"
          }</button>
        </form>
      </div>
    </div>
  )
}

export default Contact