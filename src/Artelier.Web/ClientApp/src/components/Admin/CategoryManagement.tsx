import React, { useState, useEffect } from 'react';
import { Category } from '../../types';

export const CategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/categories');
            if (!response.ok) throw new Error('Kategoriler yüklenemedi');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = selectedCategory 
                ? `/api/categories/${selectedCategory.id}` 
                : '/api/categories';
            
            const method = selectedCategory ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Kategori kaydedilemedi');

            // Formu resetle ve listeyi güncelle
            resetForm();
            await fetchCategories();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Bir hata oluştu');
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
            return;
        }

        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Kategori silinemedi');

            await fetchCategories();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Bir hata oluştu');
        }
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name,
            description: category.description
        });
    };

    const resetForm = () => {
        setSelectedCategory(null);
        setFormData({
            name: '',
            description: ''
        });
        setError(null);
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            {/* Form Bölümü */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">
                    {selectedCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Kategori Adı
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
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
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        {selectedCategory && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                            >
                                İptal
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {selectedCategory ? 'Güncelle' : 'Ekle'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Kategori Listesi */}
            <div className="bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kategori Adı
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Açıklama
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4">
                                    {category.description}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Düzenle
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 