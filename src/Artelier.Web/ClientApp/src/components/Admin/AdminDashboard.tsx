import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ArtworkManagement } from './ArtworkManagement';
import { CategoryManagement } from './CategoryManagement';

export const AdminDashboard: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Yönetim Paneli</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <nav className="bg-white shadow rounded-lg p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    to="/admin/artworks"
                                    className="block px-4 py-2 rounded-md hover:bg-gray-100"
                                >
                                    Sanat Eserleri
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/admin/categories"
                                    className="block px-4 py-2 rounded-md hover:bg-gray-100"
                                >
                                    Kategoriler
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                
                <div className="md:col-span-3">
                    <Routes>
                        <Route path="artworks" element={<ArtworkManagement />} />
                        <Route path="categories" element={<CategoryManagement />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}; 