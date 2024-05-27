import { View, Text, StyleSheet, Button } from 'react-native';

const DEFAULT_MESSAGE = "Someting went wrong. Please try to reload the application.";
const BUTTON_CONFIRM_TITLE = "OK";

function Error({ message=DEFAULT_MESSAGE, onConfirm, btnConfirmTitle=BUTTON_CONFIRM_TITLE }) {
    return (
        <View style={styles.container}>
            <Text>An error occured</Text>
            <Text>{message}</Text>
            {
                onConfirm && <Button onPress={onConfirm} title={btnConfirmTitle} />
            }
        </View>
    );
}

export default Error;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});