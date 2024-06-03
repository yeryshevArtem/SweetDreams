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
    const currIndex = talesCtx.tales.findIndex((tale) => tale.id === params.taleId);
    const prevIndex = currIndex - 1;
    const nextIndex = currIndex + 1;

    useEffect(() => {
        navigation.setOptions({
            title: selectedTale.title,
            headerTintColor: GlobalStyles.colors.primary1
        })
    }, [selectedTale]);

    const playNext = () => {
        let nextTaleId;

        if (talesCtx.tales[nextIndex]) {
            nextTaleId = talesCtx.tales[nextIndex].id;
        } else {
            nextTaleId = talesCtx.tales[0].id;
        }
        navigation.navigate('TaleDetail', { taleId: nextTaleId });
    };

    const playBlack = () => {
        let prevTaleId;

        if (prevIndex === -1) {
            prevTaleId = talesCtx.tales[talesCtx.tales.length - 1].id;
        } else {
            prevTaleId = talesCtx.tales[prevIndex].id;
        }

        navigation.navigate('TaleDetail', { taleId: prevTaleId });
    };

    return (
        <Background style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>{selectedTale.title}</Text>
            </View>
            <View style={styles.playerBox}>
                <Player 
                    imageUrl={selectedTale.imageUrl} 
                    audioUrl={selectedTale.audioUrl}
                    onPlayBack={playBlack}
                    onPlayForward={playNext}
                />
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