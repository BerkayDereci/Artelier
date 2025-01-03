import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artwork } from '../../types';

interface ArtworkState {
    items: Artwork[];
    selectedArtwork: Artwork | null;
    loading: boolean;
    error: string | null;
}

const initialState: ArtworkState = {
    items: [],
    selectedArtwork: null,
    loading: false,
    error: null
};

const artworkSlice = createSlice({
    name: 'artworks',
    initialState,
    reducers: {
        setArtworks: (state, action: PayloadAction<Artwork[]>) => {
            state.items = action.payload;
        },
        setSelectedArtwork: (state, action: PayloadAction<Artwork>) => {
            state.selectedArtwork = action.payload;
        },
        addArtwork: (state, action: PayloadAction<Artwork>) => {
            state.items.push(action.payload);
        },
        updateArtwork: (state, action: PayloadAction<Artwork>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteArtwork: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const {
    setArtworks,
    setSelectedArtwork,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    setLoading,
    setError
} = artworkSlice.actions;

export default artworkSlice.reducer; 