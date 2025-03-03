import { createAsyncThunk } from "@reduxjs/toolkit"
import instance from "./instance"

 export const pokemonList =  createAsyncThunk(
    "pokemon/pokemonList",
    async ({ limit=10, next=0 }: { limit: number, next: number}) => {
        const res = await instance.get(`/pokemon?limit=${limit}&offset=${next}0`)
        return res.data
    }
)

export const pokemonDetails = createAsyncThunk(
    "pokemon/pokemonDetails",
    async (name: string = "") => {
        const res = await instance.get(`/pokemon/${name}`)
        return res
    }
)