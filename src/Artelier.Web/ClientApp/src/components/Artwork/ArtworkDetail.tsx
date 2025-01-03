import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Artwork } from '../../types';

export const ArtworkDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArtwork();
    }, [id]);

    const fetchArtwork = async () => {
        try {
            const response = await fetch(`/api/artworks/${id}`);
            const data = await response.json();
            setArtwork(data);
        } catch (error) {
            console.error('Error fetching artwork:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Yükleniyor...</div>;
    if (!artwork) return <div>Sanat eseri bulunamadı.</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold">{artwork.title}</h1>
                    <p className="text-gray-600 mt-4">{artwork.description}</p>
                    <div className="mt-6">
                        <p className="text-2xl font-bold">{artwork.price} TL</p>
                        <p className="text-gray-500 mt-2">
                            Kategori: {artwork.category?.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 