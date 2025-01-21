import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./Form1040Form.css";
import {
  createForm1040,
  readForm1040,
  updateForm1040,
} from "../../store/form1040Slice";

const filingStatuses = [
  "Single",
  "Married Filing Jointly",
  "Married Filing Separately",
  "Head of Household",
  "Qualifying Widow(er)",
];

const Form1040Form = ({
  closeForm,
  form1040Id,
  initialData,
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.form1040);
  const { human } = useSelector((state) => state.human);
  const humans = Object.values(human);
  const { address } = useSelector((state) => state.address);
  const addresses = Object.values(address);
  const [formData, setFormData] = useState({
    name: "my taxes",
    tax_year: 2024,
    filing_status: "Single",
    filer_id: 1,
    spouse_id: 2,
    wages: 20000,
    withholdings: 4000,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        name: initialData.name,
        tax_year: initialData.tax_year,
        filing_status: initialData.filing_status,
        filer_id: initialData.filer_id,
        spouse_id: initialData.spouse_id,
        wages: initialData.wages,
        withholdings: initialData.withholdings,
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
    if (!filingStatuses.includes(formData.filing_status)) {
      errors.filing_status =
        "filing status must be federally recognized";
    }
    if (formData.wages && formData.wages < 0) {
      errors.wages = "wages must be positive";
    }
    if (formData.withholdings && formData.withholdings < 0) {
      errors.withholdings = "withholdings must be positive";
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
        updateForm1040({ id: form1040Id, ...formData }),
      );
    } else {
      result = await dispatch(createForm1040(formData));
    }

    if (result.error) {
      const action = isUpdate ? "update" : "create";
      setErrors(
        result.payload?.errors || {
          _error: `failed to ${action} form1040`,
        },
      );
      return;
    }
    dispatch(readForm1040());
    closeForm();
  };

  return (
    <form className="form1040-form" onSubmit={handleSubmit}>
      <h2>{isUpdate ? "update" : "new"} form1040</h2>

      <label>name</label>
      <input
        placeholder="my taxes"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>tax year</label>
      <input
        placeholder="2024"
        name="tax_year"
        type="number"
        value={formData.tax_year}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.tax_year && <p className="error">{errors.tax_year}</p>}

      <label>address id</label>
      <select
        name="address_id"
        value={formData.address_id}
        onChange={handleChange}
        disabled={status === "loading"}
      >
        {addresses.map((address) => (
          <option key={address.id} value={address.id}>
            {address.street} {address.city} {address.state}
          </option>
        ))}
      </select>
      {errors.address_id && (
        <p className="error">{errors.address_id}</p>
      )}

      <label>filing status</label>
      <select
        name="filing_status"
        value={formData.filing_status}
        onChange={handleChange}
        disabled={status === "loading"}
      >
        {filingStatuses.map((filingStatus) => (
          <option key={filingStatus} value={filingStatus}>
            {filingStatus}
          </option>
        ))}
      </select>
      {errors.filing_status && (
        <p className="error">{errors.filing_status}</p>
      )}

      <label>filer</label>
      <select
        name="filer_id"
        value={formData.filer_id}
        onChange={handleChange}
        disabled={status === "loading"}
      >
        {humans.map((human) => (
          <option key={human.id} value={human.id}>
            {human.first_name}{" "}
            {human.middle_initial && `${human.middle_initial}. `}
            {human.last_name}
          </option>
        ))}
      </select>
      {errors.filer_id && <p className="error">{errors.filer_id}</p>}

      <label>spouse</label>
      <select
        name="spouse_id"
        value={formData.spouse_id}
        onChange={handleChange}
        disabled={status === "loading"}
      >
        {humans.map((human) => (
          <option key={human.id} value={human.id}>
            {human.first_name}{" "}
            {human.middle_initial && `${human.middle_initial}. `}
            {human.last_name}
          </option>
        ))}
      </select>
      {errors.spouse_id && (
        <p className="error">{errors.spouse_id}</p>
      )}

      <label>wages, form w2, box 1</label>
      <input
        placeholder="20000"
        name="wages"
        type="number"
        value={formData.wages}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.wages && <p className="error">{errors.wages}</p>}

      <label>wages, form w2, box 2</label>
      <input
        placeholder="4000"
        name="withholdings"
        type="number"
        value={formData.withholdings}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.withholdings && (
        <p className="error">{errors.withholdings}</p>
      )}

      {errors._error && <p className="error">{errors._error}</p>}
      <button disabled={status === "loading"}>
        {isUpdate ? "update" : "add"} form1040
      </button>
    </form>
  );
};

Form1040Form.propTypes = {
  closeForm: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  form1040Id: PropTypes.number,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    tax_year: PropTypes.number,
    filing_status: PropTypes.string,
    address_id: PropTypes.number,
    filer_id: PropTypes.number,
    spouse_id: PropTypes.number,
    wages: PropTypes.number,
    withholdings: PropTypes.number,
  }),
};

export default Form1040Form;
