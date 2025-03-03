import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import pokemon from "./slice/pokemonSlice"
import { createWrapper } from 'next-redux-wrapper';
import { useDispatch } from "react-redux";
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import query from "./slice/querySlice";

export type RootState = {
    [pokemon.name]: ReturnType<typeof pokemon.reducer>,
    [query.name]: ReturnType<typeof query.reducer>,
}

// export type RootState = pokemonStateType

export const makeStore = wrapMakeStore(() => {
    return configureStore({
        reducer: {
            [pokemon.name]: pokemon.reducer,
            [query.name]: query.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(nextReduxCookieMiddleware({
            subtrees: [{
                subtree: query.name,
                ignoreStateFromStaticProps: true,
                compress: false
            }],
        }))
    })
})
export const wrapper = createWrapper(makeStore)

type Store = ReturnType<typeof makeStore>;

export type AppState = ReturnType<Store['getState']>;

export type AppDispatch = Store['dispatch'];

//app dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;



