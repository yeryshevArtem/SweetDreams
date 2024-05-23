import { View, Text, StyleSheet } from 'react-native';

function TaleItem({ title }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageBox}></View>
            <View style={styles.titleBox}>
                <Text>{title}</Text>
            </View>
        </View>
    );
}

export default TaleItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    imageBox: {
        height: 150,
        width: 150,
        borderRadius: 10,
        borderWidth: 2,
    },
    titleBox: {
        marginVertical: 10
    }
});