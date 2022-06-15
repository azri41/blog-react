//custom hooks
import { useState,useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(response => {
                    if (!response.ok){
                        throw Error('Could not fetch the data for that resource');
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data);
                    setError(null)
                    setIsPending(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsPending(false);
                })
        }, 1000);
    }, []);

    return {data, isPending, error};
}

export default useFetch;