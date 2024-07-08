import { View, StyleSheet } from "react-native";
import { TextInput, HelperText } from 'react-native-paper';

import { GlobalStyles } from "../../../constants/styles";

function Input({ labelText, onChange, value, keyboardType, secure, error }) {
	return (
		<View style={styles.container}>
			<TextInput
				value={value}
				onChangeText={onChange}
				keyboardType={keyboardType}
				secureTextEntry={secure}
				label={labelText}
				type="flat"
				error={error}
			/>
			<HelperText type="error" visible={error}>
				{error}
			</HelperText>
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},
	label: {
		fontSize: 20,
		color: GlobalStyles.colors.primary1,
		paddingBottom: 10,
	},
	input: {
		borderColor: GlobalStyles.colors.primary1,
		borderWidth: 2,
		paddingVertical: 12,
		paddingHorizontal: 6,
		borderRadius: 7,
		fontSize: 16,
		backgroundColor: GlobalStyles.colors.primary1,
	},
	inputError: {
		borderColor: GlobalStyles.colors.error,
	},
	labelError: {
		color: GlobalStyles.colors.error,
	},
});
