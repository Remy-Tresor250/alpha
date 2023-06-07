import { createSlice } from "@reduxjs/toolkit";

type State = {
    user: null | object,
    todos: any[],
    token: null | string,
}

const initialState: State = {
    user: {},
    todos: [],
    token: null
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setTodos: (state, action) => {
            state.todos = action.payload.todos
        }
    }
})

export const {setLogin, setLogout, setTodos} = globalSlice.actions

export default globalSlice.reducer

