import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { readHuman } from "../../store/humanSlice";
import HumanDetail from "../HumanDetail";
import HumanForm from "../HumanForm";
import "./Human.css";

const Human = () => {
  const { human } = useSelector((state) => state.human);
  const [showHumanForm, setShowHumanForm] = useState(false);
  const dispatch = useDispatch();
  const humans = Object.entries(human);
  const toggleShowHumanForm = () => {
    setShowHumanForm(!showHumanForm);
  };

  useEffect(() => {
    dispatch(readHuman());
  }, [dispatch]);

  return (
    <>
      <button onClick={toggleShowHumanForm}>
        {showHumanForm ? "close new human" : "new human"}
      </button>
      {showHumanForm && (
        <HumanForm closeForm={() => setShowHumanForm(false)} />
      )}
      <section className="humans-section">
        {humans &&
          humans.map(([humanId, humanData]) => (
            <HumanDetail
              key={humanId}
              humanId={Number(humanId)}
              humanData={humanData}
            />
          ))}
      </section>
    </>
  );
};

export default Human;
