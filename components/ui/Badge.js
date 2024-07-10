import { StyleSheet } from "react-native";
import { useTheme, Badge } from "react-native-paper";

function BadgeUI({ children }) {
	const theme = useTheme();
	return (
		<Badge
			visible
			size={30}
			style={[
				styles.badge,
				{
					backgroundColor: theme.colors.primary,
					color: theme.colors.secondary,
				},
			]}
		>
			{children}
		</Badge>
	);
}

export default BadgeUI;

const styles = StyleSheet.create({
	badge: {
		paddingLeft: 20,
		paddingRight: 20,
		alignSelf: "left",
	},
});
