"use client"
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import globalReducer from "./state"
import { ReactNode } from "react";


const store = configureStore({
    reducer: globalReducer
})

const StoreProvider = ({children} : {children: ReactNode}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider