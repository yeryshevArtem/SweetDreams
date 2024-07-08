import { StyleSheet, View, Linking, Alert } from "react-native";
import { useContext } from "react";
// ui
import Background from "../components/ui/Background";
// components
import SettingsList from "../components/Account/SettingsList";
// constants
import { templates } from "../constants/locale";
// store
import { AuthContext } from "../store/auth-context";

function ProfileScreen() {
	const authCtx = useContext(AuthContext);

	const settingsOptions = [
		// {
		// 	id: "accountDetails",
		// 	title: templates.profileSettingsAccountDetailTitle,
		// 	callbackFn: () => {
		// 		console.log("Naviate to account details");
		// 	},
		// 	icon: "person",
		// },
		{
			id: "support",
			title: templates.profileSettingsCustomerSupportTitle,
			callbackFn: () => {
				const email = templates.supportEmail;
				const subject = templates.supportSubject;
				const body = templates.supportBody;

				const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

				Linking.openURL(url).catch((err) =>
					Alert.alert(templates.supportErrorTitle, templates.supportErrorBody),
				);
			},
			icon: "chatbox",
		},
		{
			id: "logout",
			title: templates.profileSettingsLogoutTitle,
			callbackFn: () => {
				authCtx.logout();
			},
			icon: "exit",
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
