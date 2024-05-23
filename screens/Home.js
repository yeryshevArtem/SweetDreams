import { useState, useEffect } from 'react';
import { fetchAllTales } from '../util/http';
import Loading from '../components/ui/Loading';
import Error from '../components/ui/Error';
import AllTalesList from '../components/Tales/AllTalesList';

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
        <AllTalesList allTales={allTales}/>
    );
}

export default Home;