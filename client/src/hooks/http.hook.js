import { useCallback, useState } from "react";

export const useHttp = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [toast, setToast] = useState('');

    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, { method, body, headers })
        const data = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(data.errors[0]);
            setToast(data.message);
            return;
        }

        setToast(data.message);
        setLoading(false);
        return data;
    }, [])

    const clearError = () => setError(null);

    return { isLoading, request, error, toast, clearError }
}