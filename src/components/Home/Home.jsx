import { useSelector } from "react-redux";
import "./Home.css";
import { selectCurrentKing } from "../../store/kingSlice";

const Home = () => {
  const king = useSelector(selectCurrentKing);
  return (
    <>
      <h2 className="home">home</h2>
      <h3>{(king ? "now that" : "once") + " you are logged in,"}</h3>
      <ol style={{ listStyleType: "decimal", padding: "2em" }}>
        <li>
          enter some info about the people filing taxes under the
          &quot;human&quot; section.
        </li>
        <li>
          then enter address info in the &quot;address&quot; section
        </li>
        <li>
          finally, save your form 1040 info in the &quot;1040&quot;
          section.
        </li>
      </ol>
    </>
  );
};
export default Home;
