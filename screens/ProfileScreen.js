import { StyleSheet, View, Linking, Alert } from "react-native";
import { useContext } from "react";
// ui
import Background from "../components/ui/Background";
// components
import SettingsList from "../components/Account/SettingsList";
// constants
import { locale } from "../constants/locale";
// store
import { AuthContext } from "../store/auth-context";

function ProfileScreen() {
	const authCtx = useContext(AuthContext);

	const settingsOptions = [
		// {
		// 	id: "accountDetails",
		// 	title: locale.profileSettingsAccountDetailTitle,
		// 	callbackFn: () => {
		// 		console.log("Naviate to account details");
		// 	},
		// 	icon: "person",
		// },
		{
			id: "support",
			title: locale.profileSettingsCustomerSupportTitle,
			callbackFn: () => {
				const email = locale.supportEmail;
				const subject = locale.supportSubject;
				const body = locale.supportBody;

				const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

				Linking.openURL(url).catch((err) =>
					Alert.alert(locale.supportErrorTitle, locale.supportErrorBody),
				);
			},
			icon: "chat-question-outline",
		},
		{
			id: "logout",
			title: locale.profileSettingsLogoutTitle,
			callbackFn: () => {
				authCtx.logout();
			},
			icon: "exit-to-app",
		},
	];

	return (
		<Background style={styles.container}>
			<View style={styles.settingsListBox}>
				<SettingsList data={settingsOptions} />
			</View>
		</Background>
	);
}

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	settingsListBox: {
		marginTop: 20,
	},
});
