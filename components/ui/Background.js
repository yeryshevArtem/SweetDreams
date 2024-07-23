import { ImageBackground, StyleSheet } from "react-native";

function Background({ children }) {
	return (
		<ImageBackground
			source={require("../../assets/background.jpg")}
			style={styles.background}
			blurRadius={7}
		>
			{children}
		</ImageBackground>
	);
}

export default Background;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
});
