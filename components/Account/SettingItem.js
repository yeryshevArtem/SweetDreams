import { StyleSheet } from "react-native";
import { useTheme, List } from "react-native-paper";

function SettingItem({ title, pressHandler, icon }) {
	// theme
	const theme = useTheme();
	return (
		<List.Item
			title={title}
			onPress={pressHandler}
			left={() => <List.Icon color={theme.colors.secondary} icon={icon} />}
			right={() => (
				<List.Icon color={theme.colors.secondary} icon="arrow-right" />
			)}
			style={[
				styles.settingItemBox,
				{ backgroundColor: theme.colors.settingItemColor },
			]}
			titleStyle={[styles.title, { color: theme.colors.secondary }]}
		/>
	);
}

export default SettingItem;

const styles = StyleSheet.create({
	settingItemBox: {
		padding: 20,
		borderRadius: 15,
		marginVertical: 10,
		marginHorizontal: 10,
	},
	title: {
		paddingVertical: 7.5,
	},
});
