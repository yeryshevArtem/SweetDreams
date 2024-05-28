import { Text } from 'react-native';
import { useContext, useEffect } from 'react';
// store
import { TalesContext } from '../store/tales-context';
// ui
import Background from '../components/ui/Background';
// constants
import { GlobalStyles } from '../constants/styles';

function TaleDetail({ route, navigation }) {
    const params = route.params;
    const talesCtx = useContext(TalesContext);

    const selectedTale = talesCtx.tales.filter(( tale ) => tale.id === params.taleId)[0];

    useEffect(() => {
        navigation.setOptions({
            title: selectedTale.title,
            headerTintColor: GlobalStyles.colors.primary1
        })
    }, [selectedTale]);

    return (
        <Background>
            <Text>{selectedTale.title}</Text>
        </Background>
    );
}

export default TaleDetail;