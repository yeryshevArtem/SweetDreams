import { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
// util
import { fetchAllTales } from '../util/http';
// components
import Error from '../components/ui/Error';
import TalesList from '../components/Tales/TalesList';
// store
import { TalesContext } from '../store/tales-context';
// UI 
import Background from '../components/ui/Background';
import Loading from '../components/ui/Loading';

function AllTales() {
    const talesCtx = useContext(TalesContext);
    const { data, error, isLoading } = talesCtx.talesState;

    useEffect(() => {
        async function getAllTales() {
            try {
                talesCtx.fetchTalesRequest();
                const allTalesTemp = await fetchAllTales();
                talesCtx.fetchTalesSuccess(allTalesTemp);
            } catch (err) {
                talesCtx.fetchTalesError(err);
            }
        }
        getAllTales();
    }, []);

    const closeError = () => {
        talesCtx.fetchTalesError(null);
    };

    return (
        <Background style={styles.container}>
            {
                error && !isLoading && <Error message="Cannot fetch all tales, try to reload the page." onConfirm={closeError} />
            }
            {
                isLoading && <Loading />
            }
            <View style={styles.listBox}>
                <TalesList allTales={data} horizontal={true} />
            </View>
        </Background>

    );
}

export default AllTales;

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