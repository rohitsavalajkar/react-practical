import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/styles";
import TaskList from "../TaskList";

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      margin: 40,
    },
    textField: {
      width: "70%",
    },
    button: { flex: 1, height: 55 },
    buttonSl: { height: 40, marginTop: 20 },
    buttonParent: {
      height: 40,
      display: "flex",
      flexDirection: "row",
      justifyItems: "space-between",
      width: "30%",
      paddingLeft: 10,
    },
    enableSelection: {
      marginTop: 20,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "100%",
    },
  })
);

const Todo = () => {
  const classes = useStyles();
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState();
  const [toggelUpdate, setToggleUpdate] = useState(true);
  const [selectOn, setSelectOn] = useState(false);
  const [isItemSelected, setItemSelected] = useState(false);
  const [selectedEditItem, SetSelectedEditItem] = useState(null);

  useEffect(() => {
    if (selectOn) {
      let isSelectedFound = false;
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].selected) {
          isSelectedFound = true;

          break;
        }
      }
      setItemSelected(isSelectedFound);
    }
  }, [selectOn, taskList]);

  const onAddTasks = (event) => {
    if (task && toggelUpdate) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: task,
        selected: false,
      };
      setTaskList((olditems) => {
        return [...olditems, allInputData];
      });
      setTask(" ");
    } else {
      setTaskList(
        taskList.map((ele) => {
          if (ele.id === selectedEditItem) {
            return { ...ele, name: task };
          }
          return ele;
        })
      );
      setToggleUpdate(true);
      setTask("");
      SetSelectedEditItem(null);
    }
  };
  const onDeleteItem = (id) => {
    setTaskList((olditems) => {
      return olditems.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const handleItemSelect = (id) => {
    setTaskList(
      taskList.map((ele) => {
        if (ele.id === id) {
          return { ...ele, selected: !ele.selected };
        }
        return ele;
      })
    );
  };

  const handleSelect = () => {
    if (selectOn) {
      setTaskList(
        taskList.map((ele) => {
          return { ...ele, selected: false };
        })
      );
    }

    setSelectOn(!selectOn);
  };

  const handleDeleteSelected = (id) => {
    setTaskList((oldItems) => {
      return oldItems.filter((item) => {
        return !item.selected;
      });
    });
  };
  const handleEdit = (id) => {
    let editItem = taskList.find((ele) => {
      return ele.id === id;
    });
    setToggleUpdate(false);
    setTask(editItem.name);
    SetSelectedEditItem(id);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <TextField
          autoComplete="todoList"
          name="todoList"
          variant="outlined"
          onChange={(event) => setTask(event.target.value)}
          id="todoList"
          label="Add Task"
          value={task}
          className={classes.textField}
        />

        <div className={classes.buttonParent}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={onAddTasks}
          >
            {toggelUpdate ? "Add" : "Update Task"}
          </Button>
          <div style={{ width: 10 }} />
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleDeleteSelected}
            disabled={!isItemSelected}
          >
            Delete Selected
          </Button>
        </div>
      </div>

      <div className={classes.enableSelection}>
        <Button
          className={classes.buttonSl}
          variant="contained"
          color="secondary"
          onClick={() => handleSelect()}
        >
          {selectOn ? "Disable Selection" : "Enable Selection"}
        </Button>
      </div>

      <TaskList
        onDelete={onDeleteItem}
        onEdit={handleEdit}
        onSelect={handleItemSelect}
        select={selectOn}
        items={taskList}
      />
    </>
  );
};

export default Todo;
