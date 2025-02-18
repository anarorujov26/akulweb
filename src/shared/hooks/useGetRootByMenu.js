import useCommon from "../context/useCommon";
import { useParams } from 'react-router-dom';

const useGetRootByMenu = () => {
    
    const menu = useCommon((state) => state.menu);
    const { root } = useParams();

    function fetch() {
        let menuItem = menu.find(rel => rel.root == root);

        return {
            icon: menuItem.icon,
            id: menuItem.id,
            parentId: menuItem.parentId,
            root: menuItem.root,
            title: menuItem.title,
            type: menuItem.type
        };
    }

    return { refetch: fetch };
}

export default useGetRootByMenu;