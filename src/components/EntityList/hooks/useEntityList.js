import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useApi from '../../../shared/hooks/useApi';
import { useEffect, useState } from 'react';
import successToast from './../../../shared/toasts/successToast';
import useGetRootByMenu from '../../../shared/hooks/useGetRootByMenu';

export const useEntityList = () => {
  const { root } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);
  const [columnVisibilty, setColumnVisibilty] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const viewSettingsApi = useApi('GET', `/viewsettings?name=${root}list`, false);
  const productsData = useApi('GET', null, false);
  const viewSettingsUpdate = useApi('PUT', '/viewsettings', false);
  const getRootByMenu = useGetRootByMenu();


  async function FETCH_DATA() {
    
    let fieldsList = viewSettingsApi.data?.data.regions[0]?.fields;
    let exFields = fieldsList.map(element => (element.name)).join(',');
    let url = `/${root}?ex_fields=${exFields}`
    let isSortedField = fieldsList.find(rel => rel.sortby != 0);

    if (isSortedField != undefined) {
      url += `&pg_d=${isSortedField.show == 1 ? 'asc' : 'desc'}&pg_o=${isSortedField.name}`
    }
    productsData.refetch(url);

    const targetColumnVisibilty = fieldsList.reduce((acc, rel) => {
      acc[rel.name] = rel.show == 1;
      return acc;
    }, {});

    setColumnVisibilty(targetColumnVisibilty);
    setFields(viewSettingsApi.data?.data.regions[0]?.fields);
    setIsLoading(false);
  }

  const handleChangeColumnWidth = async (width, fieldName) => {

    let targetFields = [...fields];
    let changeWithFieldIndex = targetFields.findIndex(rel => rel.name == fieldName);
    targetFields[changeWithFieldIndex].width = width;
    let obj = { fields: [{ viewFieldId: targetFields[changeWithFieldIndex].id, width: width }] }
    setFields(targetFields);
    const response = await viewSettingsUpdate.refetch(null, obj);
    if (response.error == null) successToast('Yadda saxlanıldı!');

  };

  const handleChangeColumn = async (changedFields) => {
    let changedForShow = changedFields.filter(rel => rel.isChanged);
    if (changedForShow[0]) {
      let targetColumnVisibilty = { ...columnVisibilty };

      let REQUEST_DATA = {
        fields: [
          ...changedForShow.map(rel => {
            targetColumnVisibilty[rel.name] = rel.show
            return ({ viewFieldId: rel.id, show: rel.show ? 1 : 0 })
          })
        ]
      }
      setColumnVisibilty(targetColumnVisibilty);
      let response = await viewSettingsUpdate.refetch(null, REQUEST_DATA);

      if (response.error == null) {
        successToast('Yadda saxlanıldı!')
      }

    }
  }

  const onRowClick = (event) => {
    const state = getRootByMenu.refetch();
    navigate(`/${state.type}`,{
      state:{
        thisId:event.id,
        ...state
      }
    })
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
    list: productsData.data != null ? productsData.data.data == '' ? [] : productsData.data.data : [],
    columnVisibilty: columnVisibilty,
    handleChangeColumnWidth,
    handleChangeColumn,
    onRowClick,
    isLoading: isLoading,
    error: error,
  };
};

export default useEntityList; 