import { FlatList, View, StyleSheet } from 'react-native';
import TaleItem from './TaleItem';

function renderAllTalesItem({ item }) {
    return <TaleItem title={item.title} imageUrl={item.imageUrl} id={item.id} audioUrl={item.audioUrl} />;
}

function TalesList({ allTales, horizontal = false }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={allTales}
                renderItem={renderAllTalesItem}
                keyExtractor={(item) => item.id}
                horizontal={horizontal}
            />
        </View>
    );
};

export default TalesList;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
