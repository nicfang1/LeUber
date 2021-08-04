import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import { Platform } from "react-native";
import "intl/locale-data/jsonp/en";

if (Platform.OS === "android") {
	if (typeof (Intl as any).__disableRegExpRestore === "function") {
		(Intl as any).__disableRegExpRestore();
	}
}

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

// If we have SURGE pricing
const SURGE_CHARGE_RATE = 1.5;

interface RideOption {
	id: string;
	title: string;
	multiplier: number;
	image: string;
}

const RideOptionsCard = () => {
	const [selected, setSelected] = useState<RideOption>();
	const navigation = useNavigation();
	const travelTimeInformation = useSelector(selectTravelTimeInformation);

	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate("NavigateCard" as never)}
					style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
				>
					<Icon name="chevron-left" type="font-awesome" />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>
					Select a Ride - {travelTimeInformation?.distance?.text}
				</Text>
			</View>

			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={
							selected?.id === item.id
								? tw`flex-row items-center justify-between px-10 bg-gray-200`
								: tw`flex-row items-center justify-between px-10`
						}
					>
						<Image
							style={{ width: 70, height: 70, resizeMode: "contain" }}
							source={{ uri: item.image }}
						/>
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{item.title}</Text>
							<Text>{travelTimeInformation?.duration.text} Travel Time</Text>
						</View>
						<Text style={tw`text-xl`}>
							{new Intl.NumberFormat("en-GB", {
								style: "currency",
								currency: "GBP",
							}).format(
								(travelTimeInformation?.duration.value! *
									SURGE_CHARGE_RATE *
									item.multiplier) /
									100
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity
					style={tw.style(`bg-black py-3 m-3`, { "bg-gray-300": !selected })}
					disabled={!selected}
				>
					<Text style={tw`text-center text-white text-xl`}>
						Choose {selected?.title}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
