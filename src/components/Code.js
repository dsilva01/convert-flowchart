// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import { useContextMenu } from "./Contextmenu";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";

export const Code = (props) => {

  useContextMenu();

  const hideModal = () => {
    props.isOpen(false);
  };
  const copyContent = () => {
    // let copyText = document.getElementById("copyText");
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(props.codigo);
  };

  // const onTrigger = (event, type) => {
  //   event.preventDefault();
  //   // console.log(event);
  //   props.type(type);
  //   hideModal();
  // }
  // console.log(props.open);
  return <>
    <Modal show={props.open} onHide={hideModal}>
      {/* <ModalHeader>
        <ModalTitle>AAA</ModalTitle>
      </ModalHeader> */}
      <ModalBody>
        <div style={{whiteSpace: "pre-line"}}>
          <p>{props.codigo}</p>
          <button type="button" className="btn btn-secondary" id="copyText" onClick={copyContent}>Copiar</button>
        </div>
      </ModalBody>
      {/* <ModalFooter>
        <button onClick={hideModal}>Cancel</button>
        <button onClick={hideModal}>Save</button>
      </ModalFooter> */}
    </Modal></>;
};

// export default Menu;