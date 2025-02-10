import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useApi from '../../../shared/hooks/useApi';
import errorToast from '../../../shared/toasts/errorToast';
import successToast from './../../../shared/toasts/successToast';

export const useEntityList = () => {
  const { root } = useParams();

  const [dataFields, setDataFields] = useState([]);
  const [columnVisibilty, setColumnVisibility] = useState({});

  // ViewSettings API çağrısı
  const viewSettingsApi = useApi('GET', root ? `/viewsettings?name=${root}list` : null, null, true);

  // Liste verisi API çağrısı
  const listApi = useApi('GET', null, null, false);

  // Kolon genişliği değiştirme API çağrısı
  const columnWidthApi = useApi('PUT', '/viewsettings', null, false);

  const generateListUrl = (fields) => {
    if (!fields?.length || !root) return null;

    const ex_fields = fields.map(element => element.name).join(',');
    if (!ex_fields) return null;

    const isSortField = fields.find(element => element.sortby !== 0);
    let url = `/${root}?ex_fields=${ex_fields}`;

    if (isSortField) {
      url += `&pg_d=${isSortField.sortby === 1 ? 'asc' : 'desc'}&pg_o=${isSortField.name}`;
    }

    return url;
  };

  const fetchList = async (fields) => {
    if (!fields?.length || !root) return;

    try {
      const url = generateListUrl(fields);

      await listApi.refetch(url);
    } catch (error) {
      console.error('Liste verisi çekme hatası:', error);
    }
  };



  const handleChangeColumnWidth = async (width, fieldName) => {
    try {
      let taregtFields = [...dataFields];

      const currentFieldIndex = dataFields.findIndex(field => field.name == fieldName);
      taregtFields[currentFieldIndex].width = width;
      setDataFields(taregtFields);


      if (currentFieldIndex == -1) {
        errorToast('Belə sahə tapılmadı!');
        return;
      }
      
      const requestBody = {
        fields: [{ viewFieldId: taregtFields[currentFieldIndex].id, width }]
      };

      successToast('Dəyişikliklər yadda saxlanıldı!')

      await columnWidthApi.refetch(null, requestBody);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handleChangeColumn = (changedFields) => {
    const isChangedFields = changedFields.filter(field => field.isChanged);
  };

  useEffect(() => {
    if (!root) return;
    viewSettingsApi.resetData();
    listApi.resetData();
    setDataFields([]);
    setColumnVisibility({});
  }, [root]);


  useEffect(() => {
    const processViewSettings = async () => {
      if (!viewSettingsApi.data?.status === 'success') return;

      const fields = viewSettingsApi.data.data?.regions?.[0]?.fields || [];
      if (!fields.length) return;
      setDataFields(fields);

      let targetColumnVisibilty = {};
      fields.forEach((field) => {
        targetColumnVisibilty[field.name] = field.show === 1;
      });

      setColumnVisibility(targetColumnVisibilty);
      await fetchList(fields);
    };

    if (viewSettingsApi.data) {
      processViewSettings();
    }

  }, [viewSettingsApi.data]);


  const isLoading = viewSettingsApi.loading || listApi.loading || columnWidthApi.loading;
  const hasError = viewSettingsApi.data?.status === 'error' ||
    listApi.data?.status === 'error' ||
    columnWidthApi.data?.status === 'error';

  return {
    fields: dataFields,
    list: Array.isArray(listApi.data?.data) ? listApi.data.data : [],
    columnVisibilty,
    handleChangeColumnWidth,
    handleChangeColumn,
    isLoading,
    error: hasError
  };
};

export default useEntityList; 