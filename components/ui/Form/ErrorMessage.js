import { Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

function ErrorMessage({ children }) {
	return <Text style={styles.error}>{children}</Text>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
	error: {
		fontWeight: 700,
		fontSize: 15,
		color: GlobalStyles.colors.error,
	},
});
