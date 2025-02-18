import React, { useState } from "react";
import { Menu, Button } from "@mui/material";
import DynamicIcon from './DynamicIcon';
import DraggableList from './DraggableList';

/**
 * A draggable menu component that allows reordering and toggling visibility of items
 * 
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.list - Array of menu items with the following structure:
 *   @param {string} props.list[].name - Unique identifier for the item
 *   @param {string} props.list[].title - Display text for the item
 *   @param {boolean} props.list[].show - Whether the item is visible/enabled
 * 
 * @param {Function} props.onChange - Callback fired when items are reordered or toggled
 *   @param {Array<Object>} items - Updated array of items with new order and visibility states
 *   @param {boolean} items[].isChanged - Whether this item's visibility was toggled
 *   @param {boolean} items[].isChangedPosition - Whether this item was reordered
 * 
 * @example
 * const list = [
 *   { name: 'item1', title: 'Item 1', show: true },
 *   { name: 'item2', title: 'Item 2', show: false }
 * ];
 * 
 * const handleChange = (updatedItems) => {
 *   console.log(updatedItems);
 * };
 * 
 * return (
 *   <DraggableMenu 
 *     list={list}
 *     onChange={handleChange}
 *   />
 * );
 */

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
      <Button
        variant="outlined"
        startIcon={<DynamicIcon name={'Settings'} sx={{ fontSize: 18 }} />}
        onClick={handleClick}
        sx={{
          height: '40px',
          px: 2.5,
          backgroundColor: 'rgba(9, 35, 50, 0.05)',
          color: '#092332',
          borderRadius: '6px',
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          border: 'none',
          '&:hover': {
            backgroundColor: 'rgba(9, 35, 50, 0.1)',
            border: 'none'
          }
        }}
      >
        Sütunlar
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 200,
            backgroundColor: '#ffffff',
            border: '1px solid #edf2f7',
            borderRadius: '8px',
            '& .MuiList-root': {
              padding: '8px 0'
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
