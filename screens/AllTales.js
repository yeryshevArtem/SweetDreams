import { useContext, useEffect, useState } from 'react';
import { fetchAllTales } from '../util/http';
import Loading from '../components/ui/Loading';
import Error from '../components/ui/Error';
import TalesList from '../components/Tales/TalesList';
// store
import { TalesContext } from '../store/tales-context';
// UI 
import Background from '../components/ui/Background';

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

    return (
        <Background>
            {
                error && !isLoading && <Error message="Cannot fetch all tales, try to reload the page." onConfirm={closeError} />
            }
            {
                isLoading && <Loading />
            }
            <TalesList allTales={talesCtx.tales}/>
        </Background>

    );
}

export default AllTales;