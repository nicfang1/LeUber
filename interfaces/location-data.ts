import { Point } from "react-native-maps";

export interface LocationData {
	location: Point;
	description: string;
}

export interface TravelInfo {
	distance: {
		text: string;
		value: number;
	};
	duration: {
		text: string;
		value: number;
	};
}
