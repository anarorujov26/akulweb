import React, { useState } from "react";
import { Menu } from "@mui/material";
import HoverIconButton from './HoverIconButton';
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
