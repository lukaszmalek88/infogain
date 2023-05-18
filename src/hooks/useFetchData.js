import { useState } from "react";


export const useFetchData = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch('https://mocki.io/v1/7d2013a7-53dc-4e27-8e86-38cf818bcf7c', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));

            setData(result);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { data, isLoading, err, fetchData }
}