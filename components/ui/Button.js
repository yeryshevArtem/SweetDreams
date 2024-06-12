import { Pressable, StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Button({ onPress, children }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressed]}>
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    buttonContainer: {
        borderWidth: 1,
        backgroundColor: GlobalStyles.colors.primary4,
        padding: 15,
        borderRadius: 10
    },
    buttonText: {
        color: GlobalStyles.colors.primary1,
        fontSize: 20,
        textAlign: 'center'
    }
});
