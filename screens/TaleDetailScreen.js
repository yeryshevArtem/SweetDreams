import { Text, StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
// store
import { TalesContext } from "../store/tales-context";
// ui
import Background from "../components/ui/Background";
import Player from "../components/ui/Player";
// constants
import { GlobalStyles } from "../constants/styles";

// components
import LikePanel from "../components/Tales/LikePanel";

function TaleDetailScreen({ route, navigation }) {
	const params = route.params;
	const talesCtx = useContext(TalesContext);
	const { data: talesData, error, isLoading } = talesCtx.talesState;

	const selectedTale = talesData.filter((tale) => tale.id === params.taleId)[0];
	const currIndex = talesData.findIndex((tale) => tale.id === params.taleId);
	const prevIndex = currIndex - 1;
	const nextIndex = currIndex + 1;

	useEffect(() => {
		navigation.setOptions({
			title: selectedTale.title,
			headerTintColor: GlobalStyles.colors.primary1,
		});
	}, [selectedTale]);

	const playNext = () => {
		let nextTaleId;

		if (talesData[nextIndex]) {
			nextTaleId = talesData[nextIndex].id;
		} else {
			nextTaleId = talesData[0].id;
		}
		navigation.navigate("TaleDetail", { taleId: nextTaleId });
	};

	const playBlack = () => {
		let prevTaleId;

		if (prevIndex === -1) {
			prevTaleId = talesData[talesData.length - 1].id;
		} else {
			prevTaleId = talesData[prevIndex].id;
		}

		navigation.navigate("TaleDetail", { taleId: prevTaleId });
	};

	return (
		<Background style={styles.container}>
			<View style={styles.headlineRow}>
				<View style={styles.titleBox}>
					<Text style={styles.title}>{selectedTale.title}</Text>
				</View>
				<View style={styles.likeBox}>
					<LikePanel switched={selectedTale.liked} id={selectedTale.id} />
				</View>
			</View>
			<View style={styles.playerRow}>
				<View style={styles.playerBox}>
					<Player
						imageUrl={selectedTale.imageUrl}
						audioUrl={selectedTale.audioUrl}
						onPlayBack={playBlack}
						onPlayForward={playNext}
					/>
				</View>
			</View>
		</Background>
	);
}

export default TaleDetailScreen;

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		flex: 1,
	},
	title: {
		color: GlobalStyles.colors.primary1,
		textAlign: "center",
		fontSize: 20,
	},
	playerBox: {
		flex: 1,
	},
	likeBox: {
		position: "absolute",
		right: 0,
		top: 8,
	},
	titleBox: {
		marginTop: 20,
		flex: 1,
		alignItems: "center",
	},
	headlineRow: {
		flex: 0.5,
		flexDirection: "row",
	},
	playerRow: {
		flex: 5,
	},
});
