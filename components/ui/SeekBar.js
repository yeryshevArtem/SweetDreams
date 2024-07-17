import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "react-native-paper";
// utils
import { formatTime } from "../../util/time";

function SeekBar({ maxVal, val, onChange }) {
	const theme = useTheme();
	return (
		<View style={styles.container}>
			<Slider
				style={styles.slider}
				value={val}
				maximumValue={maxVal}
				onValueChange={onChange}
				minimumTrackTintColor={theme.colors.seekbarMinTrackColor}
				maximumTrackTintColor={theme.colors.seekbarMaxTrackColor}
			/>
			<Text style={[styles.timeline, { color: theme.colors.fontColor }]}>
				{formatTime(val)} / {formatTime(maxVal)}
			</Text>
		</View>
	);
}

export default SeekBar;

const styles = StyleSheet.create({
	container: {
		marginVertical: 25,
	},
	timeline: {
		textAlign: "center",
	},
	slider: {
		width: 350,
		height: 40,
	},
});
