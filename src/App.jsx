import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import ThemeSelector from "./components/ThemeSelector";

const App = () => {
  return (
    <Router>
      <ThemeSelector />
      <Layout />
    </Router>
  );
};

export default App;
