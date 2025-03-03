import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { pokemonDetails, pokemonList } from '../service/pokemonService';

const initialState = {
    pokemonList: {
        status: 'idle',
        error: null,
        isLoading: false,
        data: [],
        count: 0
    },
    pokemonDetails: {
        status: 'idle',
        error: null,
        isLoading: false,
        data: []
    },
}

const pokemon = createSlice({
    name: "pokemon",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        // pokemonList
        .addCase(pokemonList.fulfilled, (state, action) => {
            // console.log('action', action)
            state.pokemonList = {
                status: 'success',
                error: null,
                isLoading: false,
                data: action.payload.results,
                count: action.payload.count
            }
        })
        .addCase(pokemonList.rejected, (state, action) => {
            state.pokemonList = {
                status: 'failed',
                error: (action.payload as any) || 'Something went wrong',
                isLoading: false,
                data: [],
                count: 0
            }
        })
        .addCase(pokemonList.pending, (state, action) => {
            state.pokemonList = {
                ...state.pokemonList,
                status: 'loading',
                error: null,
                isLoading: true,
                data: [],
            }
        })

        // pokemonDetails
        .addCase(pokemonDetails.fulfilled, (state, action) => {
            state.pokemonDetails = {
                status: 'success',
                error: null,
                data: action.payload.data,
                isLoading: false
            }
        })
        .addCase(pokemonDetails.rejected, (state, action) => {
            state.pokemonDetails = {
                status: 'failed',
                error: (action.payload as any) || 'Something went wrong',
                data: [],
                isLoading: false
            }
        })
        .addCase(pokemonDetails.pending, (state, action) => {
            state.pokemonDetails = {
                status: 'loading',
                error: null,
                data: [],
                isLoading: true
            }
        })
    },
});

export default pokemon