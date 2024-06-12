import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthForm from './AuthForm';
// ui
import LinkButton from '../ui/LinkButton';
// constants
import { templates } from '../../constants/templates';

function AuthContent({ onSubmit, isLogin }) {
    const navigation = useNavigation();

    function switchToAuthPage() {
        const authScreen = isLogin ? 'Signup' : 'Login';
        navigation.navigate(authScreen);
    }

    return (
        <View style={styles.container}>
            <AuthForm onSubmit={onSubmit} isLogin={isLogin} />
            <View>
                <LinkButton onPress={switchToAuthPage}>
                    {isLogin ? templates.createNewUserNavigationLink : templates.loginNavigationLink}
                </LinkButton>
            </View>
        </View>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    }
});