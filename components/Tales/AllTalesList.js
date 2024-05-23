import { FlatList, View, StyleSheet } from 'react-native';
import TaleItem from './TaleItem';

function renderAllTalesItem({ item }) {
    return <TaleItem title={item.title} />
}

function AllTalesList({ allTales }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={allTales}
                renderItem={renderAllTalesItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
            />
        </View>
    );
};

export default AllTalesList;

const styles = StyleSheet.create({
    container: {
        flex: 'auto'
    }
});
