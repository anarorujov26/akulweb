import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from './../../../shared/hooks/useApi';

export const useEntityManage = () => {
    const viewSettingsApi = useApi('GET',null,false);
    const location = useLocation();

    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);
    const [regions,setRegions] = useState([]);
    const [fields,setFields] = useState(null);

    const fetchViewSettings = async () => {
        try {
            const response = await viewSettingsApi.refetch(
                `/viewsettings?name=${location.state.root}edit`,
                null
            )

            if(response.error == null){
                const targetRegions = response.data.data.regions;
                let newRegions = [];
                let newFields = {};

                targetRegions.forEach((element,index) => {
                    let targetObj = {
                        ...element,
                        regionFieldsId:`fields_${index}`
                    }
                    newFields[`fields_${index}`] = [...targetObj.fields];
                    delete targetObj.fields;
                    newRegions.push(targetObj);
                });

                setRegions(newRegions);
                setFields(newFields);
                setError(false);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(location.state != null){
            fetchViewSettings();
        } else {
            setIsLoading(false);
        }
    }, [])

    return {
        isLoading,
        error,
        regions,
        fields
    };
};

export default useEntityManage; 