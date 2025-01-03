import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

export const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Artelier
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-300">
                        Sanat Eserleri
                    </Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/admin" className="hover:text-gray-300">
                                Admin Panel
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="hover:text-gray-300"
                            >
                                Çıkış
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300">
                            Giriş
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}; 