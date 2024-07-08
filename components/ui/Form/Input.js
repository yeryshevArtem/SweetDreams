import { View, StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

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
});
