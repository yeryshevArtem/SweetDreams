import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthForm from "./AuthForm";
// ui
import LinkButton from "../ui/LinkButton";
// constants
import { templates } from "../../constants/templates";

function AuthContent({ onAuthenticate, isLogin }) {
	const navigation = useNavigation();

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
				<LinkButton onPress={switchAuthMode}>
					{isLogin
						? templates.createNewUserNavigationLink
						: templates.loginNavigationLink}
				</LinkButton>
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
