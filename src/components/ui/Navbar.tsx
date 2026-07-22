
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    return (
        <nav className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <img src="/PF_Logo.png" alt="Dnd Reg Page" className="h-12" />
                </Link>
                
                {/* Desktop Navigation - centered */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-8">
                    <Link 
                        to="/register" 
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        Register
                    </Link>
                    <Link 
                        to="/progress" 
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        My Progress
                    </Link>
                    <Link 
                        to="/signup" 
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        Edit Account
                    </Link>
                </div>

                {/* Hamburger Button - right side on mobile */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <>
                {/* Backdrop */}
                <div 
                    className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{ zIndex: 40 }}
                />
                
                {/* Slide-in Menu */}
                <div 
                    className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{ zIndex: 50 }}
                >
                    <div className="flex flex-col gap-6 p-6 pt-20">
                        <Link 
                            to="/register" 
                            className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Register
                        </Link>
                        <Link 
                            to="/progress" 
                            className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            My Progress
                        </Link>
                        <Link 
                            to="/signup" 
                            className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Edit Account
                        </Link>
                    </div>
                </div>
            </>
        </nav>
    )
}