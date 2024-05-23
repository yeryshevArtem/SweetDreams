import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { fetchAllTales } from '../util/http';
import Loading from '../components/ui/Loading';
import Error from '../components/ui/Error';

function Home() {
    const [allTales, setAllTales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getAllTales() {
            try {
                setIsLoading(true);
                const allTalesTemp = await fetchAllTales();
                setAllTales(allTalesTemp);
            } catch(err) {
                setError(err);
            }
            setIsLoading(false);
        }
        getAllTales();
    }, []);

    const closeError = () => {
        setError(null);
    };

    if (isLoading) {
        return <Loading />
    }

    if (error && !isLoading) {
        return <Error message="Cannot fetch all tales, try to reload the page." onConfirm={closeError} />
    }

    return (
        <View>
            <FlatList
                data={allTales}
                renderItem={({ item }) => <Text>{item.title}</Text>}
            />
        </View>
    );
}

export default Home;