import React, { createContext, useReducer, useContext, useEffect } from 'react';
import type { Todo } from '../types';

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'EDIT_TODO'; id: string; newText: string }
  | { type: 'CLEAR_COMPLETED' };

type TodoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now().toString(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.newText } : todo
      );
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodoContext must be used within a TodoProvider');
  return context;
};

export default TodoProvider;
