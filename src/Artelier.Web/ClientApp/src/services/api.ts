import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const artworkService = {
    getAll: () => api.get('/artworks'),
    getById: (id: number) => api.get(`/artworks/${id}`),
    create: (data: FormData) => api.post('/artworks', data),
    update: (id: number, data: FormData) => api.put(`/artworks/${id}`, data),
    delete: (id: number) => api.delete(`/artworks/${id}`)
};

export const categoryService = {
    getAll: () => api.get('/categories'),
    create: (data: any) => api.post('/categories', data),
    update: (id: number, data: any) => api.put(`/categories/${id}`, data)
};

export const authService = {
    login: (credentials: any) => api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
    getProfile: () => api.get('/profile')
}; 