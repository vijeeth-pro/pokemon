import { Pokemon } from "@/types/pokemon"

export interface pokemonStateType {
  pokemonList: PokemonListState,
  pokemonDetails: PokemonDetailsState
}

export interface PokemonDetailsState {
    status: 'success' | 'failed' | 'loading'
    error: any
    isLoading: boolean
    data: Pokemon
  }

export interface PokemonListState {
    status: 'success' | 'failed' | 'loading'
    error: any
    isLoading: boolean
    data: PokemonList[],
    count: number
  }
  
  export interface PokemonList {
    name: string
    url: string
  }
  