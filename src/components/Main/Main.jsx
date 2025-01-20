import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Main.css";
import Form1040 from "../Form1040";
import Human from "../Human";
import Address from "../Address";
import Home from "../Home";
import Theme from "../Theme";

const Main = () => {
  const { king } = useSelector((state) => state.auth);
  return (
    <main className="main">
      <Routes>
        <Route path="/home" element={<Home />} />

        {king && (
          <>
            <Route path="/1040" element={<Form1040 />} />
            <Route path="/human" element={<Human />} />
            <Route path="/address" element={<Address />} />
            <Route path="/theme" element={<Theme />} />
          </>
        )}

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </main>
  );
};

export default Main;
