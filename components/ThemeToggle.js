// components/ThemeToggle.js
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full focus:outline-none"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <span> Light Mode</span>
      ) : (
        <span> Dark Mode</span>
      )}
    </button>
  );
};

export default ThemeToggle;