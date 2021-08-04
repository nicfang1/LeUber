import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationData, TravelInfo } from "../interfaces/location-data";
import { RootState } from "../store";

interface navState {
	origin: null | LocationData;
	destination: null | LocationData;
	travelTimeInformation: null | TravelInfo;
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
		setOrigin: (state, action: PayloadAction<LocationData>) => {
			state.origin = action.payload;
		},
		setDestination: (state, action: PayloadAction<LocationData | null>) => {
			state.destination = action.payload;
		},
		setTravelTimeInformation: (state, action: PayloadAction<TravelInfo>) => {
			state.travelTimeInformation = action.payload;
		},
	},
});

export const { setDestination, setOrigin, setTravelTimeInformation } =
	navSlice.actions;
export default navSlice.reducer;

export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
	state.nav.travelTimeInformation;
