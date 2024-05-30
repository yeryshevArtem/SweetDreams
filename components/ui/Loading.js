import { View, ActivityIndicator, StyleSheet } from 'react-native';

function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
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