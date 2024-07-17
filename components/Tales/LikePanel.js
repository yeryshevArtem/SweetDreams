import { useContext } from "react";
import { View, Alert } from "react-native";
// ui
import { IconButton, useTheme } from "react-native-paper";
// util
import { updateTale } from "../../util/http";
// store
import { TalesContext } from "../../store/tales-context";
import { AuthContext } from "../../store/auth-context";
// constants
import { locale } from "../../constants/locale";

function LikePanel({ switched, id }) {
	const talesCtx = useContext(TalesContext);
	const authCtx = useContext(AuthContext);
	// theme
	const theme = useTheme();
	const { token } = authCtx.authState;

	async function addLikeHandler() {
		try {
			talesCtx.updateTaleRequest();
			const updatedTale = await updateTale({
				id,
				data: {
					liked: !switched,
				},
				token,
			});

			talesCtx.updateTaleSuccess(updatedTale);
		} catch (err) {
			Alert.alert(locale.likePanelErrorTitle, locale.likePanelErrorBody);
		}
	}

	return (
		<View>
			<IconButton
				onPress={addLikeHandler}
				size={35}
				icon="heart"
				iconColor={
					switched ? theme.colors.likeIconActive : theme.colors.likeIconInactive
				}
			/>
		</View>
	);
}

export default LikePanel;
