import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import artworkReducer from './slices/artworkSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        artworks: artworkReducer,
        categories: categoryReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 