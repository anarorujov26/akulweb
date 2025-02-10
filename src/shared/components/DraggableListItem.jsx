import React from 'react';
import { ListItem, ListItemIcon, Checkbox, ListItemText, Divider } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

const DraggableListItem = ({ item, index, onToggle, itemsLength }) => (
  <>
    <Draggable key={item.name} draggableId={item.name} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            height: 30,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#e8f5e9",
              borderRadius: 0,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 30, fontSize: 18 }}>
            <Checkbox checked={item.show} onChange={() => onToggle(item.name)} size="small" />
          </ListItemIcon>
          <ListItemText 
            primary={item.name} 
            sx={{
              fontSize: 14,
              lineHeight: "16px",
              marginRight: 2,
            }}
          />
        </ListItem>
      )}
    </Draggable>
    {index < itemsLength - 1 && <Divider sx={{ marginY: 0, backgroundColor: "#fbfbfb" }} />}
  </>
);

export default DraggableListItem; 