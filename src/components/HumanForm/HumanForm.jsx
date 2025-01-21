import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./HumanForm.css";
import {
  createHuman,
  readHuman,
  updateHuman,
} from "../../store/humanSlice";

const HumanForm = ({
  closeForm,
  humanId,
  initialData,
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.human);
  const [formData, setFormData] = useState({
    first_name: "bob",
    middle_initial: "B",
    last_name: "bobert",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        first_name: initialData.first_name,
        middle_initial: initialData.middle_initial,
        last_name: initialData.last_name,
      });
    }
  }, [isUpdate, initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (1 < formData.middle_initial.length) {
      errors.middle_initial =
        "middle initial can be at most 1 character";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let result;
    if (isUpdate) {
      result = await dispatch(
        updateHuman({ id: humanId, ...formData }),
      );
    } else {
      result = await dispatch(createHuman(formData));
    }

    if (result.error) {
      const action = isUpdate ? "update" : "create";
      setErrors(
        result.payload?.errors || {
          _error: `failed to ${action} human`,
        },
      );
      return;
    }
    dispatch(readHuman());
    closeForm();
  };

  return (
    <form className="human-form" onSubmit={handleSubmit}>
      <h2>{isUpdate ? "update" : "new"} human</h2>

      <label>first name</label>
      <input
        placeholder="first name"
        name="first_name"
        type="text"
        value={formData.first_name}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.first_name && (
        <p className="error">{errors.first_name}</p>
      )}

      <label>middle initial</label>
      <input
        placeholder="middle initial"
        name="middle_initial"
        type="text"
        value={formData.middle_initial}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.middle_initial && (
        <p className="error">{errors.middle_initial}</p>
      )}

      <label>last name</label>
      <input
        placeholder="last name"
        name="last_name"
        type="text"
        value={formData.last_name}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.last_name && (
        <p className="error">{errors.last_name}</p>
      )}

      {errors._error && <p className="error">{errors._error}</p>}
      <button disabled={status === "loading"}>
        {isUpdate ? "update" : "add"} human
      </button>
    </form>
  );
};

HumanForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  humanId: PropTypes.number,
  initialData: PropTypes.shape({
    first_name: PropTypes.string,
    middle_initial: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default HumanForm;
