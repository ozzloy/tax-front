import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";

import "./HumanDetail.css";
import { selectCurrentKing } from "../../store/kingSlice";
import HumanForm from "../HumanForm";
import { deleteHuman } from "../../store/humanSlice";

const HumanDetail = ({ humanId, humanData }) => {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const king = useSelector(selectCurrentKing);

  const handleDeleteHuman = () => {
    dispatch(deleteHuman({ id: humanId }));
  };

  return (
    <section className="human-detail">
      {showUpdateForm && (
        <HumanForm
          closeForm={() => setShowUpdateForm(false)}
          isUpdate={true}
          humanId={humanId}
          initialData={humanData}
        />
      )}
      <h2>
        {humanData.first_name}{" "}
        {humanData.middle_initial &&
          humanData.middle_initial.length === 1 &&
          `${humanData.middle_initial}. `}
        {humanData.last_name}
      </h2>
      <dl>
        <dt>created</dt>
        <dd>{new Date(humanData.created).toLocaleString()}</dd>
        <dt>updated</dt>
        <dd>{new Date(humanData.updated).toLocaleString()}</dd>
      </dl>
      <div className="human-detail-buttons">
        {humanData.king_id === king?.id && (
          <>
            <button onClick={() => setShowUpdateForm(true)}>
              update
            </button>
            <button onClick={handleDeleteHuman}>delete</button>
          </>
        )}
      </div>
    </section>
  );
};

HumanDetail.propTypes = {
  humanId: PropTypes.number.isRequired,
  humanData: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    middle_initial: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    king_id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
};

export default HumanDetail;
