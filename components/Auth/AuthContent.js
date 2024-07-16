import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
// ui
import { Button, useTheme } from "react-native-paper";
// constants
import { locale } from "../../constants/locale";

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
			<Button
				mode="text"
				onPress={switchAuthMode}
				textColor={theme.colors.linkColor}
			>
				{isLogin
					? locale.createNewUserNavigationLink
					: locale.loginNavigationLink}
			</Button>
		</View>
	);
}

export default AuthContent;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
	},
});
