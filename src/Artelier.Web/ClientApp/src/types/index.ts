export interface Artwork {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
    category?: Category;
    createdAt: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
} 