import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";

import "./Form1040Detail.css";
import { selectCurrentKing } from "../../store/kingSlice";
import Form1040Form from "../Form1040Form";
import { deleteForm1040 } from "../../store/form1040Slice";

const Form1040Detail = ({ form1040Id, form1040Data }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const king = useSelector(selectCurrentKing);
  const { human } = useSelector((state) => state.human);
  const { address } = useSelector((state) => state.address);

  const makeName = (human) =>
    human &&
    human.first_name +
      " " +
      (human.middle_initial ? human.middle_initial + ". " : "") +
      human.last_name;
  const makePlace = (address) =>
    address &&
    address.street + " " + address.city + " " + address.state;

  const handleDeleteForm1040 = () => {
    dispatch(deleteForm1040({ id: form1040Id }));
  };

  return (
    <section className="form1040-detail">
      {showUpdateForm && (
        <Form1040Form
          closeForm={() => setShowUpdateForm(false)}
          isUpdate={true}
          form1040Id={form1040Id}
          initialData={form1040Data}
        />
      )}
      <h2>{form1040Data.name}</h2>
      <dl>
        <dt>name</dt>
        <dd>{form1040Data.name}</dd>
        <dt>tax_year</dt>
        <dd>{form1040Data.tax_year}</dd>
        <dt>address</dt>
        <dd>
          {makePlace(address[form1040Data.address_id]) || "[empty]"}
        </dd>
        <dt>filing_status</dt>
        <dd>{form1040Data.filing_status}</dd>
        <dt>filer</dt>
        <dd>{makeName(human[form1040Data.filer_id]) || "[empty]"}</dd>
        <dt>spouse_id</dt>
        <dd>
          {makeName(human[form1040Data.spouse_id]) || "[empty]"}
        </dd>
        <dt>wages</dt>
        <dd>{form1040Data.wages}</dd>
        <dt>withholdings</dt>
        <dd>{form1040Data.withholdings}</dd>
      </dl>
      <dl>
        <dt>created</dt>
        <dd>{new Date(form1040Data.created).toLocaleString()}</dd>
        <dt>updated</dt>
        <dd>{new Date(form1040Data.updated).toLocaleString()}</dd>
      </dl>
      <div className="form1040-detail-buttons">
        {form1040Data.king_id === king?.id && (
          <>
            <button onClick={() => setShowUpdateForm(true)}>
              update
            </button>
            <button onClick={handleDeleteForm1040}>delete</button>
          </>
        )}
      </div>
    </section>
  );
};

Form1040Detail.propTypes = {
  form1040Id: PropTypes.number.isRequired,
  form1040Data: PropTypes.shape({
    name: PropTypes.string,
    tax_year: PropTypes.number,
    filing_status: PropTypes.string,
    filer_id: PropTypes.number,
    address_id: PropTypes.number,
    spouse_id: PropTypes.number,
    wages: PropTypes.number,
    withholdings: PropTypes.number,
    king_id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
};

export default Form1040Detail;
