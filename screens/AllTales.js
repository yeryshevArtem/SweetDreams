import { useContext, useEffect, useState } from 'react';
import { fetchAllTales } from '../util/http';
import Loading from '../components/ui/Loading';
import Error from '../components/ui/Error';
import TalesList from '../components/Tales/TalesList';
import { TalesContext } from '../store/tales-context';

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
        <TalesList allTales={talesCtx.tales}/>
    );
}

export default AllTales;