import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { LocalStorage } from "../../common/constants/localStorage";
import { AuthToken } from "../../services/types";

export interface AuthState {
	isLoggedIn: boolean;
	token: AuthToken | undefined;
}

const initialState: AuthState = {
	isLoggedIn: false,
	token: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logIn: (state, action: PayloadAction<AuthToken>) => {
			state.isLoggedIn = true;
			state.token = action.payload;
			localStorage.setItem(LocalStorage.Auth, JSON.stringify(state.token));
		},
		logOut: (state) => {
			state.isLoggedIn = false;
			state.token = undefined;
			localStorage.removeItem(LocalStorage.Auth);
		},
	},
});

export const { logIn, logOut } = authSlice.actions;

export const isLoggedIn = (): AppThunk<boolean> => (dispatch, getState) => {
	const { auth } = getState();
	if (auth.isLoggedIn === false) return false;

	if (!auth.token || !auth.token.token) return false;

	if (new Date(auth.token.expiryDateTime) > new Date()) return true;
	else {
		dispatch(logOut());
		return false;
	}
};

export const loadAuthToken = (): AppThunk<boolean> => (dispatch, _) => {
	let authTokenString = localStorage.getItem(LocalStorage.Auth);
	if (authTokenString) {
		const authToken = JSON.parse(authTokenString);
		dispatch(logIn(authToken));
		return true;
	} else {
		dispatch(logOut());
		return false;
	}
};

export default authSlice.reducer;
