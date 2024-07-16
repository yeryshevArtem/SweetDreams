import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";

function Empty({ children }) {
	const theme = useTheme();
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Ionicons name="sad" size={50} color={theme.colors.secondary} />
			</View>
			<Text variant="headlineSmall" style={{ color: theme.colors.fontColor }}>
				{children}
			</Text>
		</View>
	);
}

export default Empty;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginBottom: 20,
		flex: 1,
		alignItems: "center",
	},
	iconContainer: {
		marginVertical: 20,
	},
});
