import { FlatList, View, StyleSheet } from 'react-native';
import TaleItem from './TaleItem';
import Background from '../ui/Background';

function renderAllTalesItem({ item }) {
    return <TaleItem title={item.title} imageUrl={item.imageUrl} />
}

function AllTalesList({ allTales }) {
    return (
        <Background>
            <View style={styles.container}>
                <FlatList
                    data={allTales}
                    renderItem={renderAllTalesItem}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                />
            </View>
        </Background>
    );
};

export default AllTalesList;

const styles = StyleSheet.create({
    container: {
        flex: 'auto',
        marginVertical: 50
    }
});
