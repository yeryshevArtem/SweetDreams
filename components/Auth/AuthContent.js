import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
// ui
import { Button, useTheme } from 'react-native-paper';
// constants
import { templates } from "../../constants/templates";

function AuthContent({ onAuthenticate, isLogin }) {
	const navigation = useNavigation();
	const theme = useTheme();

	function switchAuthMode() {
		const authScreen = isLogin ? "Signup" : "Login";
		navigation.navigate(authScreen);
	}

	function submitHandler({ email, password }) {
		onAuthenticate({
			email,
			password,
		});
	}

	return (
		<View style={styles.container}>
			<AuthForm onSubmit={submitHandler} isLogin={isLogin} />
			<View>
				<Button mode="text" onPress={switchAuthMode} textColor={theme.colors.linkColor}>
					{isLogin
						? templates.createNewUserNavigationLink
						: templates.loginNavigationLink}
				</Button>
			</View>
		</View>
	);
}

export default AuthContent;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
});
