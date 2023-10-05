import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token'),
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, { payload }) => {
			state = {
				...payload,
				isAuth: true,
			};
		},
		removeUserData: (state, { payload }) => {
			state = {
				...initialState,
				token: '',
			};
		},
	},
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
