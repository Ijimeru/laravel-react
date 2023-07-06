import { configureStore } from "@reduxjs/toolkit";
import { ModeSlice } from "./features/modeSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { BookSlice } from "./features/bookSlice";

export const store = configureStore({
    reducer: {
        mode: ModeSlice.reducer,
        book: BookSlice.reducer,
    },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;
