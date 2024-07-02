import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

function Empty({ children }) {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Ionicons name="sad" size={50} color={GlobalStyles.colors.primary4} />
			</View>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
}

export default Empty;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginBottom: 20,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		color: GlobalStyles.colors.primary4,
		fontWeight: "700",
	},
	iconContainer: {
		marginVertical: 20,
	},
});
