import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import { useState } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [isSignIn, setIsSignIn] = useState(false)
  const [signInKey, setSignInKey] = useState("")

  function handleSignInClick() {
    setIsSignIn(true)
  }



  return (
    <section className="mx-auto flex max-w-sm flex-col items-center gap-6 px-4 py-20 text-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        {loading ? <p className='text-sm text-gray-500'>Signing in…</p> : <p className="text-sm text-gray-500">Login to continue</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="w-full rounded-lg border border-gray`-200 p-8 shadow-sm">
        <GoogleLogin
          onSuccess={async (credentialRes) => {
            await login(credentialRes, signInKey)
            navigate('/')
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font font-semibold text-gray-900'>Dont have an account?</h1>
        <p className='text-sm text-gray-500'>Click this button for sign in process</p>
        <Button onClick={handleSignInClick}>Trigger Sign in </Button>
      </div>

      {
        isSignIn && (
          <div className='flex flex-col gap-1'>
            <h2 className='text-xl font-semibold text-gray-600'>Type in your key here</h2>
            <input type="text" className='border border-gray-300 rounded-md text-sm' placeholder='Sign In Key' onChange={(e) => setSignInKey(e.target.value)} />
          </div>
        )
      }


    </section>
  )
}
