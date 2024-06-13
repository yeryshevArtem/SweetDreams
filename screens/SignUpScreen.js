import { useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
// ui
import Background from '../components/ui/Background';
import Loading from '../components/ui/Loading';
// utils
import { authorize } from '../util/http';
// constants 
import { templates } from '../constants/templates';
// store
import { AuthContext } from '../store/auth-context';

function SignUpScreen() {
    const authCtx = useContext(AuthContext);
    const { isLoading, error } = authCtx.authState;

    async function handleSignUp({ email, password }) {
        try {
            authCtx.authenticateLoading();
            const jwt = await authorize({
                email, 
                password,
                mode: 'signUp'
            });
            authCtx.authenticateSuccess(jwt);

        } catch (err) {
            authCtx.authenticateError(err);
            Alert.alert(templates.signUpErrorTitle, templates.signUpErrorBody);
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Background style={styles.container}>
            <View style={styles.signUpBox}>
                <AuthContent onSubmit={handleSignUp} />
            </View>
        </Background>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    signUpBox: {
        marginTop: 20
    }
});
