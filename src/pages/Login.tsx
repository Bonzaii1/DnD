import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/context/authContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, user } = useAuth()

  console.log("LOGGED AS " + user?.fname)
  return (
    <GoogleLogin
      onSuccess={async (credentialRes) => {
        await login(credentialRes)
        navigate('/')
      }}
      onError={() => {
        console.log('Login Failed')
      }}
    />
  )
}
