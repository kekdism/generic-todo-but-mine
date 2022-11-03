import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Checkbox,
  Collapse,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Add, ExpandLess, ExpandMore, Remove } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  addTodo,
  deleteTodo,
  setState,
  setVisibility,
  toggleTodo,
  Visibility,
} from "./app/todos/todosSlice";

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.todos);
  useEffect(() => {
    if (localStorage.getItem("todoList")) {
      const savedTodoList = JSON.parse(localStorage.getItem("todoList")!);
      dispatch(setState(savedTodoList));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state));
  }, [state]);

  const { todoList, visibility } = state;

  let newId = useMemo(() => {
    return (
      todoList.reduce(
        (lastId, todo) => (todo.id > lastId ? todo.id : lastId),
        0
      ) + 1
    );
  }, [todoList]);

  const visibleTodoList = (() => {
    switch (visibility) {
      case "active":
        return todoList.filter((todo) => todo.completed === false);
      case "completed":
        return todoList.filter((todo) => todo.completed === true);
      default:
        return todoList;
    }
  })();

  const isTodoListNonEmpty = visibleTodoList.length > 0;

  const [todoText, setTodoText] = useState("");

  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed((s) => !s);
  };

  const handleTodoInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(evt.target.value);
  };

  const handleTodoAdd = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addTodo({ text: todoText, completed: false, id: newId }));
    newId += 1;
    setTodoText("");
  };

  const handleTodoToggle = (id: number) => () => {
    dispatch(toggleTodo(id));
  };

  const handleTodoDelete = (id: number) => () => {
    dispatch(deleteTodo(id));
  };

  const handleFilterChange = (
    evt: React.MouseEvent<HTMLElement>,
    newFilter: Visibility
  ) => {
    if (newFilter !== null) {
      dispatch(setVisibility(newFilter));
    }
  };

  return (
    <Paper
      component="main"
      sx={{
        p: "0.5em",
        width: "50vw",
        minWidth: "280px",
        maxHeight: "98vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: " flex",
        }}
        onSubmit={handleTodoAdd}
      >
        <IconButton
          sx={{
            mr: "10px",
          }}
          onClick={handleCollapse}
          disabled={!isTodoListNonEmpty}
        >
          {!collapsed ? <ExpandLess /> : <ExpandMore color="primary" />}
        </IconButton>
        <InputBase
          fullWidth
          multiline
          required
          value={todoText}
          onChange={handleTodoInput}
        />
        <IconButton color="primary" type="submit">
          <Add />
        </IconButton>
      </Box>
      {(isTodoListNonEmpty || visibility !== "all") && (
        <>
          <Collapse in={!collapsed}>
            <List style={{ overflow: "auto", maxHeight: "70vh" }}>
              {visibleTodoList.map((todo) => {
                return (
                  <ListItem
                    key={todo.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        color="error"
                        onClick={handleTodoDelete(todo.id)}
                      >
                        <Remove />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton onClick={handleTodoToggle(todo.id)}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={todo.completed}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${todo.text}`}
                        primaryTypographyProps={{
                          style: { wordWrap: "break-word" },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "10px",
              alignItems: "center",
            }}
          >
            <Typography>{`${visibleTodoList.length} items`}</Typography>
            <ToggleButtonGroup
              color="primary"
              value={visibility}
              exclusive
              onChange={handleFilterChange}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="active">Active</ToggleButton>
              <ToggleButton value="completed">Complete</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </>
      )}
    </Paper>
  );
}

export default App;
