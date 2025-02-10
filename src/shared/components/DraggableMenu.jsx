import React, { useState } from "react";
import { Menu } from "@mui/material";
import HoverIconButton from './HoverIconButton';
import DraggableList from './DraggableList';

const DraggableMenu = ({ list, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState(list.map(item => ({ 
    ...item, 
    isChanged: false, 
    isChangedPosition: false 
  })));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setItems(prevItems => prevItems.map(item => ({ 
      ...item, 
      isChanged: false, 
      isChangedPosition: false 
    })));
  };
  
  const handleClose = () => {
    onChange(items);
    setAnchorEl(null);
  };

  const handleToggle = (id) => {
    setItems(items.map(item => 
      item.name === id 
        ? { ...item, show: !item.show, isChanged: true } 
        : item
    ));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    movedItem.isChangedPosition = true;
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setItems(reorderedItems);
  };
  
  return (
    <>
      <HoverIconButton
        color='success'
        icon={'Settings'} 
        hoverIcon={'ArrowRight'} 
        divider={true}
        onClick={handleClick}
      />
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleClose} 
        sx={{ padding: 0, boxShadow: 3 }}
      >
        <DraggableList 
          items={items}
          onToggle={handleToggle}
          onDragEnd={onDragEnd}
        />
      </Menu>
    </>
  );
};

export default DraggableMenu;
