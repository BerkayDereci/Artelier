import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types';

interface CategoryState {
    items: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    items: [],
    loading: false,
    error: null
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.items.push(action.payload);
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteCategory: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    setLoading,
    setError
} = categorySlice.actions;

export default categorySlice.reducer; 