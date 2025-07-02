import TodoProvider from '../context/TodoContext';
import FilterProvider from '../context/FilterContext';
import ThemeProvider from '../context/ThemeContext';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <TodoProvider>
      <FilterProvider>{children}</FilterProvider>
    </TodoProvider>
  </ThemeProvider>
);

export default AppProviders;
