import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={GlobalStyles.colors.primary4} />
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    }
});