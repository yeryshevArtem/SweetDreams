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

    async function handleLogin({ email, password }) {
        try {
            authCtx.authenticateLoading();
            const jwt = await authorize({
                email, 
                password,
                mode: 'signInWithPassword'
            });
            authCtx.authenticateSuccess(jwt);

        } catch (err) {
            authCtx.authenticateError(err);
            Alert.alert(templates.loginErrorTitle, templates.loginErrorBody);
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Background style={styles.container}>
            <View style={styles.loginBox}>
                <AuthContent isLogin onSubmit={handleLogin} />
            </View>
        </Background>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginBox: {
        marginTop: 20
    }
});
