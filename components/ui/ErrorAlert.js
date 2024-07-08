// ui
import { Banner, useTheme } from "react-native-paper";
// constants
import { templates } from "../../constants/locale";

function ErrorAlert({
	message = templates.errorAlertDefaultBody,
	size = 200,
	actions = [],
}) {
	// theme
	const theme = useTheme();

	return (
		<Banner
			visible
			actions={actions}
			style={{
				width: size,
				height: size,
				backgroundColor: theme.colors.error,
			}}
			icon="alert-circle-outline"
		>
			{message}
		</Banner>
	);
}

export default ErrorAlert;
