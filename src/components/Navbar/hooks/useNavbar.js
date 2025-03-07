import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useApi from '../../../shared/hooks/useApi';
import useCommon from '../../../shared/context/useCommon';

const useNavbar = () => {

  const parentsStore = useCommon((state) => state.setParents);
  const childsStore = useCommon((state) => state.setChilds);
  const parents = useCommon((state) => state.parents);
  const childs = useCommon((state) => state.childs);
  const setMenu = useCommon((state) => state.setMenu);

  const navigate = useNavigate();
  const location = useLocation();
  
  const [value, setValue] = useState(0);
  const [childValue, setChildValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);

  // Menu API çağrısı
  const menuApi = useApi('GET', '/menu', true);

  useEffect(() => {
    const processMenuData = () => {
      if (!menuApi.data?.status === 'success') return;
      const list = Array.isArray(menuApi.data.data) ? menuApi.data.data : [];
      setMenu(list);
      const parentList = list.filter(item => item.parentId === 0 && item.id !== 500);

      if (parentList.length > 0) {
        const childElements = {};
        parentList.forEach(element => {
          childElements[element.id] = list.filter(item => item.parentId === element.id);
        });

        const firstParent = parentList[0];
        const firstParentChildren = childElements[firstParent.id] || [];

        parentsStore(parentList);
        childsStore(childElements);

        if (firstParentChildren.length > 0) {
          setSelectedChildId(firstParent.id);
          setValue(0);
          setChildValue(0);
        }
      }
    };

    if (menuApi.data) {
      processMenuData();
    }
  }, [menuApi.data]);

  useEffect(() => {
    if (!menuApi.data || parents.length === 0) return;

    const currentPath = location.pathname;
    const root = currentPath.split('/').pop();

    // Önce child tab'ı bul
    let foundParentIndex = -1;
    let foundChildIndex = -1;

    parents.some((parent, parentIndex) => {
      const parentChildren = childs[parent.id] || [];
      const childIndex = parentChildren.findIndex(child => child.root === root);
      
      if (childIndex !== -1) {
        foundParentIndex = parentIndex;
        foundChildIndex = childIndex;
        return true;
      }
      return false;
    });

    // Eğer eşleşen bir tab bulunduysa, state'i güncelle
    if (foundParentIndex !== -1 && foundChildIndex !== -1) {
      const parent = parents[foundParentIndex];
      setSelectedChildId(parent.id);
      setValue(foundParentIndex);
      setChildValue(foundChildIndex);
    }
  }, [location.pathname, menuApi.data, parents, childs]);

  const handleChange = (event, newValue) => {
    const selectedParent = parents[newValue];
    if (!selectedParent) return;

    const parentChildren = childs[selectedParent.id] || [];
    if (parentChildren.length === 0) return;

    const firstChild = parentChildren[0];
    if (!firstChild?.root) return;

    setSelectedChildId(selectedParent.id);
    setValue(newValue);
    setChildValue(0);

    navigate(`/list/${firstChild.root}`);
  };

  const handleChangeChild = (event, newValue) => {
    if (!selectedChildId) return;

    const selectedChildren = childs[selectedChildId] || [];
    const selectedChild = selectedChildren[newValue];
    if (!selectedChild?.root) return;

    setChildValue(newValue);
    navigate(`/list/${selectedChild.root}`);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExit = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/";
    handleMenuClose();
  };

  const hasError = menuApi.data?.status === 'error';
  
  return {
    parents,
    childs,
    value,
    childValue,
    anchorEl,
    selectedChildId,
    handleChange,
    handleChangeChild,
    handleMenuOpen,
    handleMenuClose,
    handleExit,
    isLoading: menuApi.loading,
    error: hasError
  };
};

export default useNavbar; 