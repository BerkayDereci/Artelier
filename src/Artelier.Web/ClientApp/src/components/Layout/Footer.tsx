import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Artelier</h3>
                        <p className="text-gray-300">
                            Sanat eserlerini keşfedin ve koleksiyonunuzu yönetin.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">İletişim</h3>
                        <p className="text-gray-300">
                            Email: info@artelier.com<br />
                            Tel: +90 123 456 7890
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Takip Edin</h3>
                        <div className="space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white">
                                Instagram
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} Artelier. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}; 