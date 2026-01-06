import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';

const StudentLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    console.log("Rendering StudentLayout", user);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? "text-blue-700 font-bold border-b-2 border-blue-700" : "text-slate-600 hover:text-blue-700";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-xl font-bold text-blue-900 tracking-tight">QeemaTech</Link>

                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link to="/" className={isActive('/')}>Lessons</Link>
                            <Link to="/favorites" className={isActive('/favorites')}>Favorites</Link>
                            <Link to="/profile" className={isActive('/profile')}>My Profile</Link>
                        </nav>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-blue-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-slate-900">{user?.fullName || 'Student'}</p>
                            <p className="text-xs text-slate-500">{user?.class || 'Class N/A'}</p>
                        </div>
                        <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 shadow-lg">
                    <nav className="flex flex-col px-4 py-2 space-y-1">
                        <Link
                            to="/"
                            className={`block py-2 px-3 rounded-md text-base font-medium ${location.pathname === '/' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-900'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Lessons
                        </Link>
                        <Link
                            to="/favorites"
                            className={`block py-2 px-3 rounded-md text-base font-medium ${location.pathname === '/favorites' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-900'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Favorites
                        </Link>
                        <Link
                            to="/profile"
                            className={`block py-2 px-3 rounded-md text-base font-medium ${location.pathname === '/profile' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-900'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            My Profile
                        </Link>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default StudentLayout;
