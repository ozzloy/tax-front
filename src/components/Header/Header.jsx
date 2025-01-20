import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentModal,
  setActiveThemeId,
} from "../../store/uiSlice";
import { fetchThemes } from "../../store/themeSlice";
import Modal from "../Modal";
import "./Header.css";
import Login from "../Login";
import { getKing, logout } from "../../store/authSlice";
import Signup from "../Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentModal } = useSelector((state) => state.ui);
  const { king } = useSelector((state) => state.auth);
  const themes = useSelector((state) => state.theme.theme);

  useEffect(() => {
    dispatch(getKing());
  }, [dispatch]);

  const findLowestSystemThemeId = (themes) => {
    const systemThemes = Object.values(themes)
      .filter((theme) => theme.king_id === null)
      .sort((a, b) => a.id - b.id);
    return systemThemes[0]?.id;
  };

  const handleAuthOptions = async () => {
    if (king) {
      const result = await dispatch(logout());
      if (logout.fulfilled.match(result)) {
        await dispatch(fetchThemes());
        const lowestSystemThemeId = findLowestSystemThemeId(themes);
        if (lowestSystemThemeId) {
          dispatch(setActiveThemeId(lowestSystemThemeId));
        }
        navigate("/home");
      }
    } else {
      dispatch(setCurrentModal("auth"));
    }
  };

  const handleSignup = () => {
    dispatch(setCurrentModal("signup"));
  };

  return (
    <header className="header">
      <h1>tax front</h1>
      <button onClick={handleAuthOptions}>
        {king ? "logout" : "login / signup"}
      </button>
      <Modal
        isOpen={currentModal === "auth"}
        onClose={() => dispatch(setCurrentModal(null))}
      >
        <Login />
        <h3>new?</h3>
        <button onClick={handleSignup}>sign up</button>
      </Modal>
      <Modal
        isOpen={currentModal === "signup"}
        onClose={() => dispatch(setCurrentModal(null))}
      >
        <Signup />
      </Modal>
    </header>
  );
};

export default Header;
