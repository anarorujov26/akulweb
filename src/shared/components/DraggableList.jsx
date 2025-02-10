import React from 'react';
import { List } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableListItem from './DraggableListItem';

const DraggableList = ({ items, onToggle, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="list">
      {(provided) => (
        <List
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={{
            padding: 0,
            backgroundColor: '#ffffff',
          }}
        >
          {items.map((item, index) => (
            <DraggableListItem 
              key={item.name}
              item={item}
              index={index}
              onToggle={onToggle}
              itemsLength={items.length}
            />
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  </DragDropContext>
);

export default DraggableList; 