import { Text, StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
// constants
import { GlobalStyles } from '../../constants/styles';

function SettingItem({ title, pressHandler, icon }) {
    return (
        <Pressable
            onPress={pressHandler}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
            <View style={styles.settingItemBox}>
                <View style={styles.iconBox}>
                    <Ionicons name={icon} size={30} color={GlobalStyles.colors.primary2} />
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.actionBox}>
                    <Ionicons name="arrow-forward" size={30} color={GlobalStyles.colors.primary2} />
                </View>
            </View>

        </Pressable>
    );
}

export default SettingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pressed: {
        opacity: 0.75
    },
    settingItemBox: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: GlobalStyles.colors.primary4,
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row'
    },
    title: {
        color: GlobalStyles.colors.primary2,
        fontWeight: 'bold'
    },
    iconBox: {
        flex: 0.5,
        justifyContent: 'center'
    },
    actionBox: {
        flex: 0.5,
        justifyContent: 'center'
    },
    textBox: {
        flex: 3,
        justifyContent: 'center'
    }
});