import { useState, useEffect, useCallback, useRef } from "react";
import apiService from './../../services/apiService';
import errorToast from "../toasts/errorToast";

const useApi = (method, initialUrl = null, initialRequestData = null, autoFetch = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const mounted = useRef(true);

    const resetData = () => {
        setData(null);
        setLoading(false);
        setError(error)
        mounted.current = true;
    }
    
    useEffect(() => {
        return () => {
            mounted.current = false;
        };
    }, []);

    const fetchData = useCallback(async (overrideUrl = null, overrideRequestData = null) => {
        if (!mounted.current) return;
        setLoading(true);
        setError(null);

        try {
            let response;
            const requestData = overrideRequestData !== null ? overrideRequestData : initialRequestData;
            const url = overrideUrl !== null ? overrideUrl : initialUrl;

            if (!url) throw new Error("URL is required");
            

            switch (method.toUpperCase()) {
                case "GET":
                    response = await apiService.get(url);
                    break;
                case "POST":
                    response = await apiService.post(url, requestData);
                    break;
                case "PUT":
                    response = await apiService.put(url, requestData);
                    break;
                case "DELETE":
                    response = await apiService.delete(url);
                    break;
                default:
                    throw new Error("Unsupported HTTP method");
            }
            if (mounted.current) {
                setData(response);
            }
        } catch (err) {
            if (mounted.current) {
                setError(err);
                errorToast(err.message || 'Bilinməyən xəta baş verdi!');
            }
        } finally {
            if (mounted.current) {
                setLoading(false);
            }
        }
    }, [method, initialUrl, initialRequestData]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [fetchData, autoFetch]);

    const refetch = useCallback((newUrl = null, newRequestData = null) => {
        return fetchData(newUrl, newRequestData);
    }, [fetchData]);

    return { data, loading, error, refetch, resetData };
}

export default useApi;
