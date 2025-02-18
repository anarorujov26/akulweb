import React from 'react';
import { List, Typography, Box } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableListItem from './DraggableListItem';

const DraggableList = ({ items, onToggle, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Box sx={{ p: 1 }}>
      <Typography 
        sx={{ 
          px: 1.5, 
          mb: 1,
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        Sütunları Düzənlə
      </Typography>
      <Droppable droppableId="list">
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              p: 0,
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
    </Box>
  </DragDropContext>
);

export default DraggableList; 