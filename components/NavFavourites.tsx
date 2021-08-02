import React from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const data = [
	{
		id: "123",
		icon: "home",
		location: "Home",
		destination: "Toa Payoh",
	},
	{
		id: "456",
		icon: "briefcase",
		location: "Work",
		destination: "Harbourfront Centre",
	},
];

const NavFavourites = () => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			renderItem={({ location, destination, icon }) => {
				<TouchableOpacity>
					<Icon style={} />
				</TouchableOpacity>;
			}}
		/>
	);
};

export default NavFavourites;

const styles = StyleSheet.create({});
