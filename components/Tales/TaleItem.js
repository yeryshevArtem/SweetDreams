import { View, Text, StyleSheet, Image } from 'react-native';

function TaleItem({ title }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/Hansel-and-gretel-rackham.jpg')} style={styles.image} />
            <View style={styles.titleBox}>
                <Text>{title}</Text>
            </View>
        </View>
    );
}

export default TaleItem;

const styles = StyleSheet.create({
    container: {
        width: 150,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    titleBox: {
        marginVertical: 10
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10
    }
});