import { useContext } from 'react';
import { View, Alert } from 'react-native';
// ui
import IconButton from '../ui/IconButton';
// util
import { updateTale } from '../../util/http';
// store
import { TalesContext } from '../../store/tales-context';
import { AuthContext } from '../../store/auth-context';
// constants
import { GlobalStyles } from '../../constants/styles';
import { templates } from '../../constants/templates';

function LikePanel({ switched, id }) {
    const talesCtx = useContext(TalesContext);
    const authCtx = useContext(AuthContext);
    const { token } = authCtx.authState;

    async function addLikeHandler() {
        try {
            talesCtx.updateTaleRequest();
            const updatedTale = await updateTale({
                id,
                data: {
                    liked: !switched
                },
                token
            });

            talesCtx.updateTaleSuccess(updatedTale);
        } catch (err) {
            Alert.alert(templates.likePanelErrorTitle, templates.likePanelErrorBody);
        }

    }

    return (
        <View>
            <IconButton
                onPress={addLikeHandler}
                size={35}
                icon="heart-circle"
                color={switched ? GlobalStyles.colors.primary4 : GlobalStyles.colors.primary1}
            />
        </View>
    );
}

export default LikePanel;
