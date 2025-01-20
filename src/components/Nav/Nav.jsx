import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useSelector } from "react-redux";
const Nav = () => {
  const { king } = useSelector((state) => state.auth);
  return (
    <nav className="nav">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        home
      </NavLink>
      {king && (
        <>
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
        </>
      )}
    </nav>
  );
};

export default Nav;
