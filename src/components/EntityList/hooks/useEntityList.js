import { useParams } from 'react-router-dom';
import useApi from '../../../shared/hooks/useApi';
import { useEffect, useState } from 'react';

export const useEntityList = () => {
  const { root } = useParams();
  const [fields, setFields] = useState([]);
  const [columnVisibilty,setColumnVisibilty] = useState({});
  
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(false);

  const viewSettingsApi = useApi('GET', `/viewsettings?name=${root}list`, false);
  const productsData = useApi('GET', null, false);

  async function FETCH_DATA() {
    let fieldsList = viewSettingsApi.data?.data.regions[0]?.fields;
    let exFields = fieldsList.map(element => (element.name)).join(',');
    let url = `/${root}?ex_fields=${exFields}`
    let isSortedField = fieldsList.find(rel => rel.sortby != 0);

    if (isSortedField != undefined) {
      url += `&pg_d=${isSortedField.show == 1 ? 'asc' : 'desc'}&pg_o=${isSortedField.name}`
    }
    productsData.refetch(url);
    setFields(viewSettingsApi.data?.data.regions[0]?.fields);
    setIsLoading(false);
  }

  const handleChangeColumnWidth = async (width, fieldName) => {

  };

  const handleChangeColumn = (changedFields) => {
    const isChangedFields = changedFields.filter(field => field.isChanged);
  }

  useEffect(() => {
    if (viewSettingsApi.data != null) {
      setIsLoading(true);
      viewSettingsApi.reset();
      productsData.reset();
    }

    viewSettingsApi.refetch();
  }, [root])

  useEffect(() => {
    if (viewSettingsApi.data != null) {
      FETCH_DATA();
    }
  }, [viewSettingsApi.data]);

  return {
    fields: fields,
    list: productsData.data != null ? productsData.data.data : [],
    columnVisibilty: {},
    handleChangeColumnWidth,
    handleChangeColumn,
    isLoading: isLoading,
    error: error
  };
};

export default useEntityList; 