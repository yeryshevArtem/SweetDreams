import { View, Text, StyleSheet } from 'react-native';
// ui
import Button from './Button';
import { GlobalStyles } from '../../constants/styles';
// constants 
import { templates } from '../../constants/templates';

function Error({ message = templates.errorAlertDefaultBody, onConfirm, btnConfirmTitle = templates.errorAlertDefaultButtonText }) {
    return (
        <View style={styles.container}>
            <View style={styles.errorBox}>
                <Text style={styles.errorText}>{templates.errorAlertDefaultTitle}</Text>
                <Text style={styles.errorText}>{message}</Text>
                {
                    onConfirm && (
                        <View style={styles.buttonBox}>
                            <Button onPress={onConfirm}>{btnConfirmTitle}</Button>
                        </View>
                    )
                }
            </View>
        </View>
    );
}

export default Error;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorBox: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: GlobalStyles.colors.errorLight
    },
    errorText: {
        color: GlobalStyles.colors.error,
        textAlign: 'center',
        paddingVertical: 5
    },
    buttonBox: {
        marginVertical: 20
    }
});