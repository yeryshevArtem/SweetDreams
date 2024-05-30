import { useContext, useEffect, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const talesCtx = useContext(TalesContext);

    useEffect(() => {
        async function getAllTales() {
            try {
                setIsLoading(true);
                const allTalesTemp = await fetchAllTales();
                talesCtx.setTales(allTalesTemp);
            } catch (err) {
                setError(err);
            }
            setIsLoading(false);
        }
        getAllTales();
    }, []);

    const closeError = () => {
        setError(null);
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
                <TalesList allTales={talesCtx.tales} />
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