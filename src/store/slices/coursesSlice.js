import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setCourses: (state, { payload }) => {
			state = payload;
		},
		saveCourse: (state, { payload }) => {
			state = [...state, payload];
		},
		deleteCourse: (state, { payload }) => {
			state = state.filter((item) => item.id !== payload);
		},
	},
});

export const { setCourses, saveCourse, deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
