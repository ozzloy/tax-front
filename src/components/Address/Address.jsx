import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { readAddress } from "../../store/addressSlice";
import AddressDetail from "../AddressDetail";
import AddressForm from "../AddressForm";
import "./Address.css";

const Address = () => {
  const { address } = useSelector((state) => state.address);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const dispatch = useDispatch();
  const addresss = Object.entries(address);
  const toggleShowAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  useEffect(() => {
    dispatch(readAddress());
  }, [dispatch]);

  return (
    <>
      <button onClick={toggleShowAddressForm}>
        {showAddressForm ? "close new address" : "new address"}
      </button>
      {showAddressForm && (
        <AddressForm closeForm={() => setShowAddressForm(false)} />
      )}
      <section className="addresss-section">
        {addresss &&
          addresss.map(([addressId, addressData]) => (
            <AddressDetail
              key={addressId}
              addressId={Number(addressId)}
              addressData={addressData}
            />
          ))}
      </section>
    </>
  );
};

export default Address;
