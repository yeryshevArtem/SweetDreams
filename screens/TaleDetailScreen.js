import { StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
import { useTheme, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
// store
import { TalesContext } from "../store/tales-context";
// ui
import Background from "../components/ui/Background";
import Player from "../components/ui/Player";
// components
import LikePanel from "../components/Tales/LikePanel";

function TaleDetailScreen({ route, navigation }) {
	const params = route.params;
	const talesCtx = useContext(TalesContext);
	const theme = useTheme();
	const { data: talesData } = talesCtx.talesState;

	const selectedTale = talesData.filter((tale) => tale.id === params.taleId)[0];
	const currIndex = talesData.findIndex((tale) => tale.id === params.taleId);
	const prevIndex = currIndex - 1;
	const nextIndex = currIndex + 1;

	useEffect(() => {
		navigation.setOptions({
			title: selectedTale.title,
			headerTintColor: theme.colors.fontColor,
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
			<LinearGradient
				colors={["#1F1840", "#1856DB", "#06090F"]}
				style={styles.background}
			>
				<View style={styles.headlineRow}>
					<View style={styles.titleBox}>
						<Text
							variant="titleLarge"
							style={{
								textAlign: "center",
								color: theme.colors.fontColor,
								width: 200,
							}}
						>
							{selectedTale.title}
						</Text>
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
			</LinearGradient>
		</Background>
	);
}

export default TaleDetailScreen;

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
		flex: 1,
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
		flex: 6,
	},
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		marginVertical: 30,
		marginHorizontal: 15,
		borderRadius: 20,
	},
});
