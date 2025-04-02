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
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/google-login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispath(setUser(data.user))
            navigate("/")
            showToast('success', data.message)
        } catch (error) {
            showToast('error', error.message)
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