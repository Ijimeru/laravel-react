import { Dispatch, SetStateAction } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface stateType {
    mode: string | null;
}

const initialState: stateType = {
    mode: localStorage.getItem("mode") ? localStorage.getItem("mode") : "light",
};

export const ModeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        changeMode: (state, action: PayloadAction<{ mode: string }>) => {
            state.mode = action.payload.mode;
        },
    },
});

export default ModeSlice.reducer;
export const { changeMode } = ModeSlice.actions;
