import React from 'react';
import { ListItem, ListItemIcon, Checkbox, ListItemText, Divider } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const DraggableListItem = ({ item, index, onToggle, itemsLength }) => (
  <>
    <Draggable key={item.name} draggableId={item.name} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            height: 40,
            px: 1.5,
            '&:hover': {
              backgroundColor: 'rgba(9, 35, 50, 0.04)',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: '#64748b' }}>
            <DragIndicatorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Checkbox 
              checked={item.show} 
              onChange={() => onToggle(item.name)} 
              size="small"
              sx={{
                color: '#94a3b8',
                '&.Mui-checked': {
                  color: '#0f766e',
                }
              }}
            />
          </ListItemIcon>
          <ListItemText 
            primary={item.title || item.name}
            primaryTypographyProps={{
              sx: {
                fontSize: '0.875rem',
                color: '#334155',
                fontWeight: 400
              }
            }}
          />
        </ListItem>
      )}
    </Draggable>
    {index < itemsLength - 1 && (
      <Divider 
        sx={{ 
          my: 0.5,
          borderColor: '#f1f5f9'
        }} 
      />
    )}
  </>
);

export default DraggableListItem; 