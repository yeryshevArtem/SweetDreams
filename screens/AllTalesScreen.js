import { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
// util
import { fetchAllTales } from '../util/http';
// components
import Error from '../components/ui/ErrorAlert';
import TalesList from '../components/Tales/TalesList';
// store
import { TalesContext } from '../store/tales-context';
import { AuthContext } from '../store/auth-context';
// UI 
import Background from '../components/ui/Background';
import Loading from '../components/ui/Loading';
// constants
import { templates } from '../constants/templates';

function AllTalesScreen() {
    const talesCtx = useContext(TalesContext);
    const authCtx = useContext(AuthContext);
    const { data, error, isLoading } = talesCtx.talesState;
    const { token } = authCtx.authState;

    useEffect(() => {
        async function getAllTales() {
            try {
                talesCtx.fetchTalesRequest();
                const allTalesTemp = await fetchAllTales(token);
                talesCtx.fetchTalesSuccess(allTalesTemp);
            } catch (err) {
                talesCtx.fetchTalesError(err);
            }
        }
        getAllTales();
    }, [token]);

    const closeError = () => {
        talesCtx.fetchTalesError(null);
    };

    if (error && !isLoading) {
        return (
            <Background style={styles.container}>
                <View style={styles.errorContainer}>
                    <Error message={templates.allTalesError} onConfirm={closeError} />
                </View>
            </Background>
        );
    }

    if (isLoading) {
        return (
            <Background style={styles.container}>
                <Loading />
            </Background>
        );
    }

    return (
        <Background style={styles.container}>
            <View style={styles.listBox}>
                <TalesList allTales={data} horizontal={true} />
            </View>
        </Background>

    );
}

export default AllTalesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listBox: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 25
    },
    errorContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});