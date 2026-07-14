import { Outlet } from 'react-router-dom'
import Navbar from '@/components/ui/Navbar'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8ff] text-gray-900 antialiased">
      <header className="border-b border-gray-200">
        <Navbar />
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} App</p>
      </footer>
    </div>
  )
}
