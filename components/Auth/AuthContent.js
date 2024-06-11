import { StyleSheet, View } from 'react-native';
import AuthForm from './AuthForm';

function AuthContent() {
    return (
        <View style={styles.container}>
            <AuthForm />
        </View>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    }
});