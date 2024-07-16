import { View, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

function Loading({ size = "large" }) {
	const theme = useTheme();
	return (
		<View style={styles.container}>
			<ActivityIndicator
				animating={true}
				color={theme.colors.secondary}
				size={size}
			/>
		</View>
	);
}

export default Loading;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		flex: 1,
	},
});
