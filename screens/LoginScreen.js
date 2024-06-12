import { StyleSheet, View } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
// ui
import Background from '../components/ui/Background';

function LoginScreen() {
    function handleLogin() {
        console.log('clicked on login')
    }

    return (
        <Background style={styles.container}>
            <View style={styles.signUpBox}>
                <AuthContent isLogin onSubmit={handleLogin} />
            </View>
        </Background>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    signUpBox: {
        marginTop: 20
    }
});
