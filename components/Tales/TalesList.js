import { FlatList, View, StyleSheet } from "react-native";
import TaleItem from "./TaleItem";
// ui
import Empty from "../ui/Empty";
// constants
import { templates } from "../../constants/templates";

function renderAllTalesItem({ item }) {
	return (
		<TaleItem
			title={item.title}
			imageUrl={item.imageUrl}
			id={item.id}
			audioUrl={item.audioUrl}
		/>
	);
}

function TalesList({ allTales, horizontal = false }) {
	let verticalProps = {};

	if (!horizontal) {
		verticalProps = {
			numColumns: 2,
		};
	}
	return (
		<View style={styles.container}>
			{allTales.length ? (
				<FlatList
					data={allTales}
					renderItem={renderAllTalesItem}
					keyExtractor={(item) => item.id}
					horizontal={horizontal}
					{...verticalProps}
				/>
			) : (
				<Empty>{templates.talesEmpty}</Empty>
			)}
		</View>
	);
}

export default TalesList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
