import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./AddressForm.css";
import {
  createAddress,
  readAddress,
  updateAddress,
} from "../../store/addressSlice";

const AddressForm = ({
  closeForm,
  addressId,
  initialData,
  isUpdate = false,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.address);
  const [formData, setFormData] = useState({
    street: "321 fake st",
    city: "bobville",
    state: "AZ",
    zip: "90210",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        street: initialData.street,
        city: initialData.city,
        state: initialData.state,
        zip: initialData.zip,
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
    if (![0, 2].includes(formData.state.length)) {
      errors.state = "state must be 0 or 2 characters";
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
        updateAddress({ id: addressId, ...formData }),
      );
    } else {
      result = await dispatch(createAddress(formData));
    }

    if (result.error) {
      const action = isUpdate ? "update" : "create";
      setErrors(
        result.payload?.errors || {
          _error: `failed to ${action} address`,
        },
      );
      return;
    }
    dispatch(readAddress());
    closeForm();
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h2>{isUpdate ? "update" : "new"} address</h2>

      <label>street</label>
      <input
        placeholder="321 fake st."
        name="street"
        type="text"
        value={formData.street}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.street && <p className="error">{errors.street}</p>}

      <label>city</label>
      <input
        placeholder="bobville"
        name="city"
        type="text"
        value={formData.city}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.city && <p className="error">{errors.city}</p>}

      <label>state</label>
      <input
        placeholder="CA"
        name="state"
        type="text"
        value={formData.state}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.state && <p className="error">{errors.state}</p>}

      <label>zip</label>
      <input
        placeholder="CA"
        name="zip"
        type="text"
        value={formData.zip}
        onChange={handleChange}
        disabled={status === "loading"}
      />
      {errors.zip && <p className="error">{errors.zip}</p>}

      {errors._error && <p className="error">{errors._error}</p>}
      <button disabled={status === "loading"}>
        {isUpdate ? "update" : "add"} address
      </button>
    </form>
  );
};

AddressForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  addressId: PropTypes.number,
  initialData: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
};

export default AddressForm;
