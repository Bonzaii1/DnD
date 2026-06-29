import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/context/authContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  return (
    <GoogleLogin
      onSuccess={(credentialRes) => {
        login(credentialRes)
        navigate('/')
      }}
      onError={() => {
        console.log('Login Failed')
      }}
    />
  )
}
