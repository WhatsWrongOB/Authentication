import React from 'react'
import '../styles/login.css'
import google from '/public/google.svg'
import axios from 'axios'
import { app } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify'
import { LogInSuccess } from '../redux/userSlice'
import { useDispatch } from 'react-redux';

const OAuth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)

            const { data } = await axios.post('http://localhost:5000/auth/google', {
                username: result.user.displayName,
                email: result.user.email,
                googlePhotoUrl: result.user.photoURL
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            dispatch(LogInSuccess(data))
            navigate('/')
            toast.success('Logged in Successfully')

        } catch (error) {
            console.log(error.message)
            toast.error('Registration failed')
        }
    }
    return (
        <button className='google' onClick={handleGoogleClick}>
            <img src={google} alt="google" />
            Continue with google
        </button>
    )
}

export default OAuth