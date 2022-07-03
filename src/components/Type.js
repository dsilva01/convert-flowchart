import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import { useContextMenu } from "./Contextmenu";

export const Type = (props) => {

  useContextMenu();

  const hideModal = () => {
    props.isOpen(false);
  };

  const onTrigger = (event, type) => {
    event.preventDefault();
    // console.log(event);
    props.type(type);
    hideModal();
  }
  return <>
    <Modal show={props.open} onHide={hideModal}>
      {/* <ModalHeader>
        <ModalTitle>AAA</ModalTitle>
      </ModalHeader> */}
      <ModalBody>
        <div>
          <button type="button" className="entrada" onClick={e => onTrigger(e, 'entrada')}>
            <strong>Intput</strong>
          </button>
          <button type="button" className="saida" onClick={e => onTrigger(e, 'saida')}>
            <strong>Output</strong>
          </button>
          <button type="button" className="processo" onClick={e => onTrigger(e, 'processo')}>
            <strong>Process</strong>
          </button>
          <button type="button" className="condicao" onClick={e => onTrigger(e, 'condicao')}>
            <div>
            <strong>Decision</strong>
            </div>
          </button>
          <button type="button" className="condicao" onClick={e => onTrigger(e, 'repiticao')}>
            <div>
            <strong>Decision (Loop)</strong>
            </div>
          </button>
        </div>
      </ModalBody>
      {/* <ModalFooter>
        <button onClick={hideModal}>Cancel</button>
        <button onClick={hideModal}>Save</button>
      </ModalFooter> */}
    </Modal></>;
};

// export default Menu;