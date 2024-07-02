import { View, Text, StyleSheet } from "react-native";
// ui
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";
// constants
import { templates } from "../../constants/templates";

function Error({
	message = templates.errorAlertDefaultBody,
	onConfirm,
	btnConfirmTitle = templates.errorAlertDefaultButtonText,
	title = templates.errorAlertDefaultTitle,
}) {
	return (
		<View style={styles.container}>
			<View style={styles.errorBox}>
				<Text style={styles.errorTitle}>{title}</Text>
				<Text style={styles.errorBody}>{message}</Text>
				{onConfirm && (
					<View style={styles.buttonBox}>
						<Button onPress={onConfirm}>{btnConfirmTitle}</Button>
					</View>
				)}
			</View>
		</View>
	);
}

export default Error;

const styles = StyleSheet.create({
	container: {},
	errorBox: {
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: GlobalStyles.colors.errorLight,
		borderWidth: 2,
		borderColor: GlobalStyles.colors.error,
	},
	errorTitle: {
		color: GlobalStyles.colors.error,
		textAlign: "center",
		paddingVertical: 5,
		fontWeight: "900",
	},
	errorBody: {
		color: GlobalStyles.colors.error,
		textAlign: "center",
		paddingVertical: 5,
		fontWeight: "700",
	},
	buttonBox: {
		marginVertical: 20,
	},
});
