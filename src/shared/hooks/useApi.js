import { useState, useEffect, useCallback } from "react";
import apiService from './../../services/apiService';

const useApi = (method = "get", initialUrl = "", setup = false) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    const fetchData = useCallback(async (fetchUrl = initialUrl, params = null) => {

        const finalUrl = fetchUrl || initialUrl;
        if (!finalUrl) return;
        
        setLoading(true);
        setError(null);
        try {
            let response;
            if (method.toLowerCase() === "get") {
                response = await apiService.get(finalUrl);
            } else if (method.toLowerCase() === "post") {
                response = await apiService.post(finalUrl, params);
            } else if (method.toLowerCase() === "put") {
                response = await apiService.put(finalUrl, params);
            } else if (method.toLowerCase() === "delete") {
                response = await apiService.delete(finalUrl, { data: params });
            }
            setData(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [initialUrl, method]);

    useEffect(() => {
        if (setup) { fetchData() }
    }, [setup])


    return { data, loading, error, refetch: fetchData,reset };
};

export default useApi;
