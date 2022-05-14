import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import { useContextMenu } from "./Contextmenu";
// import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";

export const Menu = (props) => {
  const { anchorPoint, show } = props;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // const [isOpen, setIsOpen] = useState(props.open);

  useContextMenu();

  useEffect(() => {
    if (props.elementClick.type) {
      if (props.elementClick.type === "processo") {
        // let variable_value = document.getElementById("variable_value");
        // console.log("🚀 ~ file: Menu.js ~ line 18 ~ useEffect ~ " + document.getElementById("variable_value"))
        if (props.elementClick.data.value) {
          onLoad();
        }
      }
    }
  });
  useEffect(() => {
    if (props.open) {
     
      reset({ input_value: props.elementClick.data.value, type: props.elementClick.data.type});
      if (props.elementClick.type) {
        if (props.elementClick.type === "processo") {
          // console.log(11);
          let checked = document.getElementById('read_value').checked;
          if (checked) {
            document.getElementById('variable_value').disabled = true;
            document.getElementById('select').disabled = true;
          } else {
            document.getElementById('variable_value').disabled = false;
            document.getElementById('select').disabled = false;
          }
        }
      }
    }
  }, [props.open]);

  const showModal = () => {
    // setIsOpen(true);
    props.isOpen(true);
    // console.log(props.isOpen);
    // console.log(props.open);
  };

  const hideModal = () => {
    // setIsOpen(false);
    props.isOpen(false);
    // console.log(props.isOpen);
    // console.log(props.open);
  };

  const onTrigger = (event) => {
    if (props.elementClick.type === "entrada") {
      // console.log(event.target[0].map((e) => {console.log(e)}));
      let data = {
        type: "update",
        element: {
          value: event.input_value,
          type: event.type,
        }
      }
      props.action(data);
    } else if (props.elementClick.type === "processo") {
      event.preventDefault();
      // console.log(event.target[0].map((e) => {console.log(e)}));
      let element = props.variables.find((v) => v.value === event.target[0].value);
      // console.log(event);
      let data = {
        type: "update",
        element: {
          value: element.type === "boolean" ? event.target[2].value : event.target[3].value,
          variable: event.target[0].value,
          checked: event.target[1].checked,
          type: element.type
        }
      }
      props.action(data);
    } else {
      event.preventDefault();
      // console.log(event.target[0].map((e) => {console.log(e)}));
      // console.log(event.target[0].value);
      let data = {
        type: "update",
        element: {
          value: event.target.value.value,
        }
      }
      props.action(data);
    }
    // console.log(props);
    hideModal();
  }

  const onDelete = (event) => {
    event.preventDefault();
    props.action({
      type: "delete",
    });
  }

  const onLoad = () => {
    let variable_value = document.getElementById("variable_value");
    let element = props.variables.find((v) => v.value === props.elementClick.data.variable);
    // console.log(props);
    let sl = document.getElementById("select");

    if (element) {
      if (element.type === "int" && variable_value !== null) {
        variable_value.type = "string";
        // variable_value.defaultValue=props.elementClick.data.pre_value;
        variable_value.style.display = 'block';
        sl.style.display = 'none';
      } else if (element.type === "float" && variable_value !== null) {
        variable_value.type = "string";
        variable_value.style.display = 'block';
        sl.style.display = 'none';
      } else if (element.type === "boolean" && variable_value !== null) {
        variable_value.style.display = 'none';
        sl.style.display = 'block';
      } else if (element.type === "string" && variable_value !== null) {
        variable_value.type = "string";
        variable_value.style.display = 'block';
        sl.style.display = 'none';
      }
    }
  }
  const onChange = (e) => {
    let variable_value = document.getElementById("variable_value");
    let element = props.variables.find((v) => v.value === e.target.value);
    let sl = document.getElementById("select");

    if (element.type === "int") {
      variable_value.type = "string";
      // variable_value.defaultValue=props.elementClick.data.pre_value;
      variable_value.style.display = 'block';
      sl.style.display = 'none';
    } else if (element.type === "float") {
      variable_value.type = "string";
      variable_value.style.display = 'block';
      sl.style.display = 'none';
    } else if (element.type === "boolean") {
      variable_value.style.display = 'none';
      sl.style.display = 'block';
    } else {
      variable_value.type = "string";
      variable_value.style.display = 'block';
      sl.style.display = 'none';
    }
  }

  const onCheck = (e) => {
    // event.preventDefault();
    // props.action({
    //   type: "delete",
    // });
    // console.log(e);
    if (e.target.checked) {
      document.getElementById('variable_value').disabled = true;
      document.getElementById('select').disabled = true;
    } else {
      document.getElementById('variable_value').disabled = false;
      document.getElementById('select').disabled = false;
    }
  }

  const Form = () => {
    if (props.elementClick.type === "entrada") {
      return (
        <div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onTrigger)} className="row">



                <div className="input-group mb-3">

                  <div className="col-md-4 me-3">
                    <div className="form-group">
                      <select className="form-control" name="type"
                        required defaultValue={props.elementClick.data.type} {...register("type")}>
                        <option disabled>Tipo de variavel</option>
                        <option value="string">Caracter</option>
                        <option value="int">Inteiro</option>
                        <option value="float">Decimal</option>
                        <option value="boolean">Logico</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-7 me-3">
                    <div className="form-group">
                      <input type="text" id="input_value" className="form-control" aria-label="Text input with dropdown button"
                        defaultValue={props.elementClick.data.value} placeholder="Enter Value" autoComplete="off" required
                        {...register("input_value", { pattern: /^[a-z]+[A-Za-z0-9_.]*$/i })} />
                    </div>
                  </div>
                  <div className="col-md-4 me-3"></div>
                  {errors?.input_value?.type === "pattern" && (
                    <div class="text-danger">
                      Nome da Variável inválido
                    </div>
                  )}
                </div>


                <div className="col-md-12">
                  <div className="form-group text-center mx-auto col-md-3">
                    <label className="text-white"></label>
                    <button type="submit" className="btn col-md-12 btn-dark">
                      Salvar
                    </button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else if (props.elementClick.type === "processo") {
      // console.log(props);
      return (
        <div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <form id="formulario" className="row" onSubmit={onTrigger}>
                <div className="input-group mb-2">
                  <div className="col-md-8 me-3">
                    <div className="form-group">
                      <select className="form-control col-md-7" name="variable" defaultValue={props.elementClick.data.variable} onChange={onChange}>
                        <option disabled>Variavel</option>
                        {props.variables.map((vl) => {
                          return (<option key={vl.value} value={vl.value}>{vl.value}</option>);
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <div className="form-check form-control">
                        <input className="form-check-input" type="checkbox" value="" id="read_value" onChange={onCheck} defaultChecked={props.elementClick.data.checked} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Ler Valor
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-2">
                  <div className="form-group">
                    <select className="form-control" style={{ display: "none" }} name="value" id="select" defaultValue={props.elementClick.data.value}>
                      <option value="0" selected disabled>Valor</option>
                      <option value="true">Verdadeiro</option>
                      <option value="false">Falso</option>
                    </select>
                    <input type="text" name="value" id="variable_value" className="form-control" aria-label="Text input with dropdown button"
                      defaultValue={props.elementClick.data.pre_value} placeholder="Enter Value" autoComplete="off" />
                  </div>

                </div>


                <div className="col-md-12">
                  <div className="form-group text-center mx-auto col-md-3">
                    <label className="text-white"></label>
                    <button type="submit" className="btn col-md-12 btn-dark">
                      Salvar
                    </button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <form onSubmit={onTrigger}>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="nif">Valor</label>
                    <input type="text" className="form-control" /* onChange={()=>1} */ defaultValue={props.elementClick.data.value}
                      name="value" placeholder="Enter Value" required autoComplete="off" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group text-center mx-auto col-md-3">
                    <label className="text-white"></label>
                    <button type="submit" className="btn col-md-12 btn-dark">
                      Salvar
                    </button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }

  // console.log(show);
  // setIsOpen(1);

  if (show) {
    return (
      <div>
        <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
          <li className="dropdown-item" onClick={showModal} style={{ cursor: "pointer" }}>
            <strong className="dropdown-item">Editar</strong>
          </li>
          <li className="dropdown-item" onClick={onDelete} style={{ cursor: "pointer" }}>
            <strong className="dropdown-item">Apagar</strong>
          </li>
          {/* <li className="dropdown-item" style={{cursor: "pointer"}}>Copiar</li>
          <li className="dropdown-item" style={{cursor: "pointer"}}>Colar</li> */}
        </ul>

      </div>
    );
  }
  return <>
    <Modal show={props.open} onHide={hideModal}>
      {/* <ModalHeader>
        <ModalTitle>AAA</ModalTitle>
      </ModalHeader> */}
      <ModalBody>
        <Form />
      </ModalBody>
      {/* <ModalFooter>
        <button onClick={hideModal}>Cancel</button>
        <button onClick={hideModal}>Save</button>
      </ModalFooter> */}
    </Modal></>;
};

// export default Menu;