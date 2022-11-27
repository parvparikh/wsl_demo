import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import Help from "./Help.jsx";

const Heading = (props) => {
  const [help, setHelp] = useState(false);
  return (
    <div className="flex">
      <div className="flex-grow mx-2 justify-center font-roboto font-extrabold text-2xl ">
        {`Discourse Map for ${props.course}`}
      </div>
      <div
        className="hover:cursor-pointer hover:text-xl font-roboto font-extrabold mx-4 "
        onClick={() => {
          setHelp(true);
        }}
      >
        Help
      </div>
      <Modal isOpen={help}>
        <div>
          <div className="flex justify-end">
            <div
              className="hover:cursor-pointer font-roboto font-extrabold mx-4 "
              onClick={() => setHelp(false)}
            >
              X
            </div>
          </div>
          <Help></Help>
        </div>
      </Modal>
    </div>
  );
};

export default Heading;
