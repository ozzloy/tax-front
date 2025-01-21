import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { readForm1040 } from "../../store/form1040Slice";
import Form1040Detail from "../Form1040Detail";
import Form1040Form from "../Form1040Form";
import "./Form1040.css";

const Form1040 = () => {
  const { form1040 } = useSelector((state) => state.form1040);
  const [showForm1040Form, setShowForm1040Form] = useState(false);
  const dispatch = useDispatch();
  const form1040s = Object.entries(form1040);
  const toggleShowForm1040Form = () => {
    setShowForm1040Form(!showForm1040Form);
  };

  useEffect(() => {
    dispatch(readForm1040());
  }, [dispatch]);

  return (
    <>
      <button onClick={toggleShowForm1040Form}>
        {showForm1040Form ? "close new form1040" : "new form1040"}
      </button>
      {showForm1040Form && (
        <Form1040Form closeForm={() => setShowForm1040Form(false)} />
      )}
      <section className="form1040s-section">
        {form1040s &&
          form1040s.map(([form1040Id, form1040Data]) => (
            <Form1040Detail
              key={form1040Id}
              form1040Id={Number(form1040Id)}
              form1040Data={form1040Data}
            />
          ))}
      </section>
    </>
  );
};

export default Form1040;
