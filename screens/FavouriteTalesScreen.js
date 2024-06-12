import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
// store
import { TalesContext } from '../store/tales-context';
// ui
import Background from '../components/ui/Background';
// components
import TalesList from '../components/Tales/TalesList';


function FavouriteTalesScreen() {
    const talesCtx = useContext(TalesContext);

    const { data, error, isLoading } = talesCtx.talesState;

    const favourites = data.filter((tale) => tale.liked === true);


    return (
        <Background style={styles.container}>
            <View style={styles.listBox}>
                <TalesList allTales={favourites} />
            </View>
        </Background>
    );
}

export default FavouriteTalesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listBox: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 25
    }
});