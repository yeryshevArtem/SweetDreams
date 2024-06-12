import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthForm from './AuthForm';
// ui
import LinkButton from '../ui/LinkButton';
// constants
import { templates } from '../../constants/templates';

function AuthContent({ onSubmit, isLogin }) {
    const navigation = useNavigation();

    function goToLoginScreen() {
        navigation.navigate("Login");
    }
    return (
        <View style={styles.container}>
            <AuthForm onSubmit={onSubmit} />
            <View>
                <LinkButton onPress={goToLoginScreen}>
                    {isLogin ? templates.createNewUser : templates.login}
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