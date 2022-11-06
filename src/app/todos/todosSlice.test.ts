import todosReduser, {
  TodoList,
  addTodo,
  deleteTodo,
  toggleTodo,
  setState,
  setVisibility,
} from "./todosSlice";
import { describe, expect, it } from "vitest";

describe("todos reducer", () => {
  const initialState: TodoList = {
    todoList: [
      {
        text: "Todo 1",
        id: 0,
        completed: false,
      },
      {
        text: "Todo 2",
        id: 1,
        completed: true,
      },
    ],
    visibility: "all",
  };
  it("should handle initial state", () => {
    expect(todosReduser(undefined, { type: "unknown" })).toEqual({
      todoList: [],
      visibility: "all",
    });
  });
  it("should handle adding todo", () => {
    const actual = todosReduser(
      initialState,
      addTodo({
        text: "Todo 3",
        id: 2,
        completed: false,
      })
    );
    expect(actual).toEqual({
      todoList: [
        {
          text: "Todo 1",
          id: 0,
          completed: false,
        },
        {
          text: "Todo 2",
          id: 1,
          completed: true,
        },
        {
          text: "Todo 3",
          id: 2,
          completed: false,
        },
      ],
      visibility: "all",
    });
  });
  it("should handle deleting todo", () => {
    const actual = todosReduser(initialState, deleteTodo(1));
    expect(actual).toEqual({
      todoList: [
        {
          text: "Todo 1",
          id: 0,
          completed: false,
        },
      ],
      visibility: "all",
    });
  });
  it("should handle toggle todo", () => {
    const actual = todosReduser(initialState, toggleTodo(1));
    expect(actual).toEqual({
      todoList: [
        {
          text: "Todo 1",
          id: 0,
          completed: false,
        },
        {
          text: "Todo 2",
          id: 1,
          completed: false,
        },
      ],
      visibility: "all",
    });
  });
  it("should handle todo list visibility change", () => {
    const actual = todosReduser(initialState, setVisibility("active"));
    expect(actual).toEqual({
      todoList: [
        {
          text: "Todo 1",
          id: 0,
          completed: false,
        },
        {
          text: "Todo 2",
          id: 1,
          completed: true,
        },
      ],
      visibility: "active",
    });
  });
  it("should handle load state", () => {
    const actual = todosReduser(
      initialState,
      setState({
        todoList: [
          {
            text: "Another Todo 1",
            id: 2,
            completed: true,
          },
          {
            text: "Another Todo 2",
            id: 3,
            completed: false,
          },
        ],
        visibility: "completed",
      })
    );
    expect(actual).toEqual({
      todoList: [
        {
          text: "Another Todo 1",
          id: 2,
          completed: true,
        },
        {
          text: "Another Todo 2",
          id: 3,
          completed: false,
        },
      ],
      visibility: "completed",
    });
  });
});
