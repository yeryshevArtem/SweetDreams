import { useContext } from 'react';
import { View, Alert } from 'react-native';
import IconButton from '../ui/IconButton';
import { GlobalStyles } from '../../constants/styles';
// util
import { updateTale } from '../../util/http';
// store
import { TalesContext } from '../../store/tales-context';

function LikePanel({ switched, id }) {
    const talesCtx = useContext(TalesContext);

    async function addLikeHandler() {
        try {
            const updatedTale = await updateTale({
                id,
                data: {
                    liked: !switched
                }
            });

            talesCtx.updateTale(updatedTale);
        } catch (err) {
            Alert.alert('An error occured', 'When you try to like this tale, something went wrong. Please try again later.');
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
