import { StyleSheet, View } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
// ui
import Background from '../components/ui/Background';

function SignUp() {

    function handleSignUp() {
        console.log('clicked on register')
    }

    return (
        <Background style={styles.container}>
            <View style={styles.signUpBox}>
                <AuthContent onSubmit={handleSignUp} />
            </View>
        </Background>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    signUpBox: {
        marginTop: 20
    }
});
