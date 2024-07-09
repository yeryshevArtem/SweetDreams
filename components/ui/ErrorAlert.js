// ui
import { Banner, useTheme, Text, Icon } from "react-native-paper";
// constants
import { locale } from "../../constants/locale";

function ErrorAlert({
	message = locale.errorAlertDefaultBody,
	size = 200,
	actions = [],
	iconSize = 30,
}) {
	// theme
	const theme = useTheme();

	return (
		<Banner
			elevation={5}
			visible
			actions={actions}
			style={{
				width: size,
				height: size,
				backgroundColor: theme.colors.errorBannerBackgroundColor,
			}}
			icon={({ size }) => {
				return (
					<Icon
						source="alert-circle-outline"
						color={theme.colors.errorBannerIconColor}
						size={iconSize}
					/>
				);
			}}
		>
			<Text style={{ color: theme.colors.errorBannerContentColor }}>
				{message}
			</Text>
		</Banner>
	);
}

export default ErrorAlert;
