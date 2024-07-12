import { useMemo } from 'react';
import { Banner, useTheme, Text, Icon } from "react-native-paper";
// constants
import { locale, enums } from "../../constants/locale";

function Alert({
	message = locale.errorAlertDefaultBody,
	width = 200,
	height = 200,
	actions = [],
	iconSize = 30,
	type = enums.alertTypes.INFO,
	contentSize = 15
}) {
	// theme
	const theme = useTheme();

	const calculateBannerProps = (type) => {
		switch(type) {
			case enums.alertTypes.ERROR: {
				return {
					backgroundColor: theme.colors.errorBannerBackgroundColor,
					iconColor: theme.colors.errorBannerIconColor,
					contentColor: theme.colors.errorBannerContentColor,
					icon: "alert-circle-outline"

				};
			}
			case enums.alertTypes.INFO: {
				return {
					backgroundColor: theme.colors.infoBannerBackgroundColor,
					iconColor: theme.colors.infoBannerIconColor,
					contentColor: theme.colors.infoBannerContentColor,
					icon: "information-outline"
				};
			}
		}
	};

	const bannerProps = useMemo(() => {
		return calculateBannerProps(type);
	}, []);


	return (
		<Banner
			elevation={5}
			visible
			actions={actions}
			style={{
				width,
				height,
				backgroundColor: bannerProps.backgroundColor,
				borderRadius: 20
			}}
			icon={({ size }) => {
				return (
					<Icon
						source={bannerProps.icon}
						color={bannerProps.iconColor}
						size={iconSize}
					/>
				);
			}}
		>
			<Text style={{ color: bannerProps.contentColor, fontSize: contentSize }}>
				{message}
			</Text>
		</Banner>
	);
}

export default Alert;
