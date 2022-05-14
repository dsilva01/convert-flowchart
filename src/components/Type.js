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
            <strong>Entrada</strong>
          </button>
          <button type="button" className="saida" onClick={e => onTrigger(e, 'saida')}>
            <strong>Saida</strong>
          </button>
          <button type="button" className="processo" onClick={e => onTrigger(e, 'processo')}>
            <strong>Processo</strong>
          </button>
          <button type="button" className="condicao" onClick={e => onTrigger(e, 'condicao')}>
            <div>
            <strong>Condição</strong>
            </div>
          </button>
          <button type="button" className="condicao" onClick={e => onTrigger(e, 'repiticao')}>
            <div>
            <strong>Repitição</strong>
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