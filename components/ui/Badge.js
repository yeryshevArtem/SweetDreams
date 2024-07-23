import { StyleSheet, View } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

function BadgeUI({ children, size = 30 }) {
	const theme = useTheme();
	return (
		<LinearGradient
			colors={["#1F1840", "#1856DB", "#06090F"]}
			style={styles.gradientContainer}
			start={{ x: 0, y: 0 }} // Start point (top-left)
			end={{ x: 1, y: 0 }} // End point (top-right)
		>
			<View style={[styles.badge, { height: size }]}>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					style={{
						color: theme.colors.fontColor,
					}}
				>
					{children}
				</Text>
			</View>
		</LinearGradient>
	);
}

export default BadgeUI;

const styles = StyleSheet.create({
	badge: {
		paddingLeft: 20,
		paddingRight: 20,
		alignSelf: "left",
		alignItems: "center",
		justifyContent: "center",
	},
	gradientContainer: {
		alignSelf: "flex-start",
		borderRadius: 15,
		alignItems: "center",
	},
});
