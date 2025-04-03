import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '@/helpers/firebase';
import { getEvn } from '@/helpers/getEnv';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/User/user.slice';
import axios from 'axios';
const GoogleLogin = () => {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const handleLogin = async () => {
        try {
            const googleResponse = await signInWithPopup(auth, provider)
            const user = googleResponse.user
            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            }
            const response = await axios.post(`${getEvn('VITE_API_BASE_URL')}/auth/google-login`, bodyData, {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true
            })
            dispath(setUser(response.data.user))
            navigate("/")
            showToast('success', response.data.message)
        } catch (error) {
            showToast('error', error.response?.data?.message || error.message)
        }
    }
    return (
        <Button variant="outline" className="w-full" onClick={handleLogin} >
            <FcGoogle />
            Continue With Google
        </Button>
    )
}

export default GoogleLogin
