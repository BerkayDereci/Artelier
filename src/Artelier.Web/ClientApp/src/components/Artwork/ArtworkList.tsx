import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../../types';

export const ArtworkList: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArtworks();
    }, []);

    const fetchArtworks = async () => {
        try {
            const response = await fetch('/api/artworks');
            const data = await response.json();
            setArtworks(data);
        } catch (error) {
            console.error('Error fetching artworks:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map(artwork => (
                <Link 
                    key={artwork.id} 
                    to={`/artwork/${artwork.id}`}
                    className="block hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="bg-white rounded-lg overflow-hidden">
                        <img 
                            src={artwork.imageUrl} 
                            alt={artwork.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{artwork.title}</h3>
                            <p className="text-gray-600 mt-2">{artwork.description}</p>
                            <p className="text-lg font-bold mt-2">{artwork.price} TL</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}; 