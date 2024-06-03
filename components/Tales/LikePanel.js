import { View } from 'react-native';
import IconButton from '../ui/IconButton';
import { GlobalStyles } from '../../constants/styles';

function LikePanel() {
    const addLikeHandler = () => {
        console.log('liked')
    };

    return (
        <View>
            <IconButton onPress={addLikeHandler} size={35} icon="heart-circle" color={GlobalStyles.colors.primary1} />
        </View>
    );
}

export default LikePanel;
