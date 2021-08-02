import React from "react";
import { StyleSheet, SafeAreaView, View, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					source={{
						uri: "https://links.papareact.com/gzs",
					}}
					style={{
						width: 100,
						height: 100,
						resizeMode: "contain",
					}}
				/>
				<GooglePlacesAutocomplete
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
					placeholder="Where From?"
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: "en",
					}}
					minLength={2}
					enablePoweredByContainer={false}
					fetchDetails={true}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: {
									x: details?.geometry.location.lat!,
									y: details?.geometry.location.lng!,
								},
								description: data.description,
							})
						);
						dispatch(setDestination(null));
					}}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
