import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";

const TaskList = (props) => {
  return (
    <List style={{ paddingLeft: 0 }}>
      {props.items.map((item) => {
        return (
          <>
            <ListItem style={{ paddingLeft: 0 }}>
              {props.select ? (
                <Checkbox
                  checked={item.selected}
                  onClick={() => props.onSelect(item.id)}
                />
              ) : null}
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <IconButton
                onClick={() => props.onEdit(item.id)}
                disabled={props.select}
              >
                <ModeEditIcon />
              </IconButton>
              <IconButton
                onClick={() => props.onDelete(item.id)}
                disabled={props.select}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};

export default TaskList;
