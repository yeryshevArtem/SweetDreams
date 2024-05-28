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
        <Background>
            <View style={styles.container}>
                <Text style={styles.title}>{selectedTale.title}</Text>
                <Player imageUrl={selectedTale.imageUrl} audioUrl={selectedTale.audioUrl} />
            </View>
        </Background>
    );
}

export default TaleDetail;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    title: {
        color: GlobalStyles.colors.primary1,
        textAlign: 'center',
        fontSize: 20
    }
});