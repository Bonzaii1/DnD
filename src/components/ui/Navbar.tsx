
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/" className="text-lg font-semibold hover:text-blue-600 transition-colors">
                Dnd Reg Page
            </Link>
            <Link 
                to="/register" 
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
                Register
            </Link>
        </nav>
    )
}