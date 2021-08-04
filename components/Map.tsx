import { GOOGLE_MAPS_APIKEY } from "@env";
import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation,
} from "../slices/navSlice";

const Map = () => {
	const dispatch = useDispatch();
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef<MapView>(null);

	useEffect(() => {
		if (!origin || !destination) return;

		mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
			edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
		});
	}, [origin, destination]);

	useEffect(() => {
		if (!origin || !destination) return;

		const getTravelTime = async () => {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
			);
			const data = await response.json();
			dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
		};

		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_APIKEY]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin?.location.x as number,
				longitude: origin?.location.y as number,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
		>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeColor="black"
					strokeWidth={3}
					lineDashPattern={[0]}
				/>
			)}
			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin?.location.x,
						longitude: origin?.location.y,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination?.location.x,
						longitude: destination?.location.y,
					}}
					title="Destination"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
