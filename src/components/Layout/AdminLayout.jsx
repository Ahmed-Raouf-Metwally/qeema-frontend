import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', path: '/admin' },
        { label: 'Students', path: '/admin/students' },
        { label: 'Lessons', path: '/admin/lessons' },
        { label: 'School Profile', path: '/admin/school' },
    ];

    const getLinkClass = (path) => {
        const active = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
        return `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-200">
                    <span className="text-xl font-bold text-blue-900">Admin Panel</span>
                </div>

                <nav className="flex-grow p-4 space-y-1">
                    {navItems.map(item => (
                        <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200">
                    <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600">
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile Header (visible only on small screens) */}
            <div className="md:hidden fixed w-full bg-white border-b border-slate-200 z-20 h-16 flex items-center justify-between px-4">
                <span className="text-xl font-bold text-blue-900">Admin Panel</span>
                <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </div>

            {/* Main Content */}
            <main className="flex-grow md:ml-64 pt-16 md:pt-0 p-4 md:p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
