import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Artwork, Category } from '../../types';

export const ArtworkManagement: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        image: null as File | null
    });
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('categoryId', formData.categoryId);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const url = selectedArtwork 
                ? `/api/artworks/${selectedArtwork.id}` 
                : '/api/artworks';
            
            const method = selectedArtwork ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                body: data
            });

            if (response.ok) {
                // Form'u resetle
                setFormData({
                    title: '',
                    description: '',
                    price: '',
                    categoryId: '',
                    image: null
                });
                setSelectedArtwork(null);
                // Listeyi güncelle
                // TODO: Redux action'ı eklenecek
            }
        } catch (error) {
            console.error('Error saving artwork:', error);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
                {selectedArtwork ? 'Sanat Eseri Düzenle' : 'Yeni Sanat Eseri Ekle'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Başlık
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Açıklama
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fiyat
                    </label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Kategori
                    </label>
                    <select
                        value={formData.categoryId}
                        onChange={e => setFormData({...formData, categoryId: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    >
                        <option value="">Kategori Seçin</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Görsel
                    </label>
                    <input
                        type="file"
                        onChange={e => setFormData({
                            ...formData, 
                            image: e.target.files ? e.target.files[0] : null
                        })}
                        className="mt-1 block w-full"
                        accept="image/*"
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    {selectedArtwork && (
                        <button
                            type="button"
                            onClick={() => setSelectedArtwork(null)}
                            className="px-4 py-2 border rounded-md hover:bg-gray-50"
                        >
                            İptal
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {selectedArtwork ? 'Güncelle' : 'Ekle'}
                    </button>
                </div>
            </form>
        </div>
    );
}; 