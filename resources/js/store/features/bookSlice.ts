import { BookType } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface stateType {
    book: BookType | null;
}

const initialState: stateType = {
    book: null,
};

export const BookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        changeBook: (state, action: PayloadAction<{ book: BookType }>) => {
            state.book = action.payload.book;
        },
    },
});

export default BookSlice.reducer;
export const { changeBook } = BookSlice.actions;
