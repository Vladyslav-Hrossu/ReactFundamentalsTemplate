import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		setAuthors: (state, { payload }) => {
			state = payload;
		},
		saveAuthor: (state, { payload }) => {
			state = [...state, payload];
		},
	},
});

export const { setAuthors, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
