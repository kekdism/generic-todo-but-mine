import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PayloadTodo {
  text: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Visibility = "all" | "active" | "completed";

export interface TodoList {
  todoList: Todo[];
  visibility: Visibility;
}

export const todosSlice = createSlice({
  name: "todos",
  initialState: { todoList: [], visibility: "all" } as TodoList,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      const { todoList } = state;
      todoList.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<number>) {
      const { todoList } = state;
      const filteredTodos = todoList.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todoList: filteredTodos,
      };
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const { todoList } = state;
      const todo = todoList.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setVisibility(state, action: PayloadAction<Visibility>) {
      state.visibility = action.payload;
    },
    setState(state, action: PayloadAction<TodoList>) {
      return action.payload;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, setVisibility, setState } =
  todosSlice.actions;

export default todosSlice.reducer;
