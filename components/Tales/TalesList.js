import { FlatList, View, StyleSheet } from "react-native";
import TaleItem from "./TaleItem";
// ui
import Alert from "../ui/Alert";
// constants
import { locale, enums } from "../../constants/locale";

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
				<View style={styles.alertContainer}>
					<Alert
						message={locale.talesEmpty}
						type={enums.alertTypes.INFO}
						width="100%"
						contentSize={17}
						iconSize={30}
					/>
				</View>
			)}
		</View>
	);
}

export default TalesList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	alertContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
});
