import { AppProviders } from './providers/AppProviders';
import  {TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { FilterButtons } from './components/FilterButtons';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { useThemeContext } from './context/ThemeContext';

const AppContent = () => {
  const { theme } = useThemeContext();

  return (
    <div className={`app ${theme}`}>
      <ThemeToggleButton />
      <TodoInput />
      <FilterButtons />
      <TodoList />
    </div>
  );
};

const App = () => (
  <AppProviders>
    <AppContent />
  </AppProviders>
);

export default App;
