import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "../Header";
import Main from "../Main";
import Nav from "../Nav";
import { fetchCsrfToken } from "../../store/authSlice";
import { selectCurrentKing } from "../../store/kingSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const king = useSelector(selectCurrentKing);

  useEffect(() => {
    const publicPaths = ["/home", "/"];
    if (!king && !publicPaths.includes(location.pathname)) {
      navigate("/home", { replace: true });
    }
  }, [king, location.pathname, navigate]);

  useEffect(() => {
    async function fetchData() {
      dispatch(fetchCsrfToken());
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Nav />
      <Main />
    </>
  );
};

export default Layout;
