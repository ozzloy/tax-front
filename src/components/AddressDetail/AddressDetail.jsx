import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";

import "./AddressDetail.css";
import { selectCurrentKing } from "../../store/kingSlice";
import AddressForm from "../AddressForm";
import { deleteAddress } from "../../store/addressSlice";

const AddressDetail = ({ addressId, addressData }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const king = useSelector(selectCurrentKing);

  const handleDeleteAddress = () => {
    dispatch(deleteAddress({ id: addressId }));
  };

  return (
    <section className="address-detail">
      <h2>
        {addressData.street} {addressData.city}
      </h2>
      <dl>
        <dt>street</dt>
        <dd>{addressData.street}</dd>
        <dt>city</dt>
        <dd>{addressData.city}</dd>
        <dt>state</dt>
        <dd>{addressData.state}</dd>
        <dt>zip</dt>
        <dd>{addressData.zip}</dd>
      </dl>
      <dl>
        <dt>created</dt>
        <dd>{new Date(addressData.created).toLocaleString()}</dd>
        <dt>updated</dt>
        <dd>{new Date(addressData.updated).toLocaleString()}</dd>
      </dl>
      <div className="address-detail-buttons">
        {addressData.king_id === king?.id && (
          <>
            <button onClick={() => setShowUpdateForm(true)}>
              update
            </button>
            <button onClick={handleDeleteAddress}>delete</button>
          </>
        )}
      </div>
      {showUpdateForm && (
        <AddressForm
          closeForm={() => setShowUpdateForm(false)}
          isUpdate={true}
          addressId={addressId}
          initialData={addressData}
        />
      )}
    </section>
  );
};

AddressDetail.propTypes = {
  addressId: PropTypes.number.isRequired,
  addressData: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    king_id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddressDetail;
