import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [isSignIn, setIsSignIn] = useState(false)
  const [signInKey, setSignInKey] = useState("")
  const { t, i18n } = useTranslation()

  function handleSignInClick() {
    setIsSignIn(!isSignIn)
  }

  function toggleLanguage() {
    const newLang = i18n.language === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl h-screen flex-col items-center justify-center px-4 py-10 md:py-20">
      <div className="flex flex-col gap-6 md:gap-8 w-full rounded-xl border border-gray-200 p-6 md:p-12 lg:p-18 shadow-lg bg-white">
        <div className='flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12'>
          <div className='flex flex-col items-center md:items-start text-center md:text-left gap-2 w-full md:w-auto'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 tracking-tight'>{t('login.title')}</h1>
      
            <button 
              onClick={toggleLanguage}
              className='mt-2 text-sm text-blue-600 hover:text-blue-700 underline'
            >
              {i18n.language === 'en' ? 'Español' : 'English'}
            </button>
          </div>
          
          <div className='flex flex-col gap-4 md:gap-5 items-stretch w-full md:w-auto md:min-w-60'>
            <div className='rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'>
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
            <Button 
              onClick={handleSignInClick}
              variant="secondary"
              className='w-full shadow-sm hover:shadow-md transition-all duration-200 py-3'
            >
              {t('login.triggerButton')}
            </Button>
              {
            isSignIn && (
              <div className='flex flex-col gap-2 pt-2'>
                <label className='text-xs font-medium text-gray-700'>{t('login.keyLabel')}</label>
                <input 
                  type="text" 
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-gray-400' 
                  placeholder={t('login.keyPlaceholder')} 
                  onChange={(e) => setSignInKey(e.target.value)} 
                />
              </div>
            )
              }
              {loading && <p className='text-xs text-gray-500'>Loading...</p>}
              {error && <p className='text-xs text-red-600'>{error}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
