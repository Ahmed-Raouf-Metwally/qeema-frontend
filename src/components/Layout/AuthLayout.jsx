import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-blue-900">QeemaTech</h1>
                    <p className="text-slate-500 mt-2">Educational Platform</p>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
