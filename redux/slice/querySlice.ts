import { createSlice } from "@reduxjs/toolkit";


const query = createSlice({
    name: "query",
    initialState: {
        limit:10, 
        next: 0,
    },
    reducers: {
        setQuery: (state, action) => {
            state.limit = action.payload.limit
            state.next = action.payload.next;
        },
    },
});

export const { setQuery } = query.actions

export default query