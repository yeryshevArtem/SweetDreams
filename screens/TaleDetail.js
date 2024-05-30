import { Text, StyleSheet, View } from 'react-native';
import { useContext, useEffect } from 'react';
// store
import { TalesContext } from '../store/tales-context';
// ui
import Background from '../components/ui/Background';
import Player from '../components/ui/Player';
// constants
import { GlobalStyles } from '../constants/styles';

function TaleDetail({ route, navigation }) {
    const params = route.params;
    const talesCtx = useContext(TalesContext);

    const selectedTale = talesCtx.tales.filter((tale) => tale.id === params.taleId)[0];

    useEffect(() => {
        navigation.setOptions({
            title: selectedTale.title,
            headerTintColor: GlobalStyles.colors.primary1
        })
    }, [selectedTale]);

    return (
        <Background style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{selectedTale.title}</Text>
            </View>
            <View style={styles.playerBox}>
                <Player imageUrl={selectedTale.imageUrl} audioUrl={selectedTale.audioUrl} />
            </View>
        </Background>
    );
}

export default TaleDetail;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        flex: 1
    },
    title: {
        color: GlobalStyles.colors.primary1,
        textAlign: 'center',
        fontSize: 20
    },
    titleBox: {
        marginTop: 20,
        flex: 1
    },
    playerBox: {
        flex: 20
    }
});