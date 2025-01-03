import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ArtworkList } from './components/Artwork/ArtworkList';
import { ArtworkDetail } from './components/Artwork/ArtworkDetail';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { PrivateRoute } from './components/Auth/PrivateRoute';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<ArtworkList />} />
                    <Route path="/artwork/:id" element={<ArtworkDetail />} />
                    <Route 
                        path="/admin/*" 
                        element={
                            <PrivateRoute roles={['Admin']}>
                                <AdminDashboard />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App; 