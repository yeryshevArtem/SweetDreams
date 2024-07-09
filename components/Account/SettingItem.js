import { StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Text } from "react-native-paper";

function SettingItem({ title, pressHandler, icon }) {
	// theme
	const theme = useTheme();
	return (
		<Pressable
			onPress={pressHandler}
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
		>
			<View
				style={[
					styles.settingItemBox,
					{ backgroundColor: theme.colors.primary },
				]}
			>
				<View style={styles.iconBox}>
					<Ionicons name={icon} size={30} color={theme.colors.secondary} />
				</View>
				<View style={styles.textBox}>
					<Text style={{ color: theme.colors.secondary }}>{title}</Text>
				</View>
				<View style={styles.actionBox}>
					<Ionicons
						name="arrow-forward"
						size={30}
						color={theme.colors.secondary}
					/>
				</View>
			</View>
		</Pressable>
	);
}

export default SettingItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pressed: {
		opacity: 0.75,
	},
	settingItemBox: {
		padding: 20,
		borderRadius: 15,
		marginVertical: 10,
		marginHorizontal: 10,
		flexDirection: "row",
	},
	iconBox: {
		flex: 0.5,
		justifyContent: "center",
	},
	actionBox: {
		flex: 0.5,
		justifyContent: "center",
	},
	textBox: {
		flex: 3,
		justifyContent: "center",
	},
});
