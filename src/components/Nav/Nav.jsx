import { NavLink } from "react-router-dom";
import "./Nav.css";
const Nav = () => {
  return (
    <nav className="nav">
      <NavLink
        to="/human"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        human
      </NavLink>
      <NavLink
        to="/address"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        address
      </NavLink>
      <NavLink
        to="/1040"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        1040
      </NavLink>
      <NavLink
        to="/theme"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        theme
      </NavLink>
    </nav>
  );
};

export default Nav;
