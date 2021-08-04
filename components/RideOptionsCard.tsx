import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";

const data = [
	{
		id: "Uber-X-123",
		title: "UberX",
		multiplier: 1,
		image: "https://links.papareact.com/3pn",
	},
	{
		id: "Uber-XL-456",
		title: "Uber XL",
		multiplier: 1.2,
		image: "https:links.papareact.com/5w8",
	},
	{
		id: "Uber-LUX-789",
		title: "Uber LUX",
		multiplier: 1.75,
		image: "https://links.papareact.com/7pf",
	},
];

const RideOptionsCard = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate("NavigateCard" as never)}
					style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
				>
					<Icon name="chevron-left" type="font-awesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
			</View>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item: { title, multiplier, image } }) => (
					<TouchableOpacity
						style={tw`flex-row items-center justify-between px-10`}
					>
						<Image
							style={{ width: 100, height: 100, resizeMode: "contain" }}
							source={{ uri: image }}
						/>
						<View>
							<Text>{title}</Text>
							<Text>Travel Time ...</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
