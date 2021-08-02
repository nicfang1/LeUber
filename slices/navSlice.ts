import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface navState {
	origin: null | string;
	destination: null | string;
	travelTimeInformation: null | number;
}

const initialState: navState = {
	origin: null,
	destination: null,
	travelTimeInformation: null,
};

export const navSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		setOrigin: (state, action: PayloadAction<string>) => {
			state.origin = action.payload;
		},
		setDestination: (state, action: PayloadAction<string>) => {
			state.destination = action.payload;
		},
		setTravelTime: (state, action: PayloadAction<number>) => {
			state.travelTimeInformation = action.payload;
		},
	},
});

export const { setDestination, setOrigin, setTravelTime } = navSlice.actions;
export default navSlice.reducer;

export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
	state.nav.travelTimeInformation;
