import { FC } from 'react';
import { FaStream, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context';
import './navbar.css';


/**
 *
 * @description When we click the toggle-button we store
 * our preferred-theme in localStorage.
 */
export const Navbar: FC = () => {
  const { theme, onToggleThemeHandler } = useTheme();

  return (
    <nav className="navbar">
      <FaStream className="navbar__icon" />

      <h2 className="navbar__heading">ToDoApp</h2>

      <span onClick={onToggleThemeHandler}>
        {theme.light && <FaSun className="navbar__icon" title="change to dark mode" />}
        {theme.dark && <FaMoon className="navbar__icon" title="change to light mode" />}
      </span>
    </nav>
  );
};
