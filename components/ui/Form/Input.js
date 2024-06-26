import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';

function Input({ labelText, onChange, value, keyboardType, secure, hasError }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.label, hasError && styles.labelError]}>{labelText}</Text>
            <TextInput
                style={[styles.input, hasError && styles.inputError]}
                value={value}
                onChangeText={onChange}
                keyboardType={keyboardType}
                secureTextEntry={secure}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        fontSize: 20,
        color: GlobalStyles.colors.primary1,
        paddingBottom: 10
    },
    input: {
        borderColor: GlobalStyles.colors.primary1,
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderRadius: 7,
        fontSize: 16,
        backgroundColor: GlobalStyles.colors.primary1,
    },
    inputError: {
        borderColor: GlobalStyles.colors.error
    },
    labelError: {
        color: GlobalStyles.colors.error
    }
});