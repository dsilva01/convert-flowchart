import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import { useContextMenu } from "./Contextmenu";

export const Menu = (props) => {
  const { anchorPoint, show } = props;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useContextMenu();

  useEffect(() => {
    if (props.elementClick.type) {
      if (props.elementClick.type === "processo") {
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
    props.isOpen(true);
  };

  const hideModal = () => {
    props.isOpen(false);
  };

  const onTrigger = (event) => {
    if (props.elementClick.type === "entrada") {
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
      let element = props.variables.find((v) => v.value === event.target[0].value);
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
      let data = {
        type: "update",
        element: {
          value: event.target.value.value,
        }
      }
      props.action(data);
    }
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
    let sl = document.getElementById("select");

    if (element) {
      if (element.type === "int" && variable_value !== null) {
        variable_value.type = "string";
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
                        <option disabled>Type of Variable</option>
                        <option value="string">String</option>
                        <option value="int">Integer</option>
                        <option value="float">Decimal</option>
                        <option value="boolean">Boolean</option>
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
                      Invalid variable name.
                    </div>
                  )}
                </div>


                <div className="col-md-12">
                  <div className="form-group text-center mx-auto col-md-3">
                    <label className="text-white"></label>
                    <button type="submit" className="btn col-md-12 btn-dark">
                      Save
                    </button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else if (props.elementClick.type === "processo") {
      return (
        <div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <form id="formulario" className="row" onSubmit={onTrigger}>
                <div className="input-group mb-2">
                  <div className="col-md-8 me-3">
                    <div className="form-group">
                      <select className="form-control col-md-7" name="variable" defaultValue={props.elementClick.data.variable} onChange={onChange}>
                        <option disabled>Variable</option>
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
                          Read value
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-2">
                  <div className="form-group">
                    <select className="form-control" style={{ display: "none" }} name="value" id="select" defaultValue={props.elementClick.data.value}>
                      <option value="0" selected disabled>Value</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                    <input type="text" name="value" id="variable_value" className="form-control" aria-label="Text input with dropdown button"
                      defaultValue={props.elementClick.data.pre_value} placeholder="Enter Value" autoComplete="off" />
                  </div>

                </div>


                <div className="col-md-12">
                  <div className="form-group text-center mx-auto col-md-3">
                    <label className="text-white"></label>
                    <button type="submit" className="btn col-md-12 btn-dark">
                      Save
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
                    <label htmlFor="nif">Value</label>
                    <input type="text" className="form-control" /* onChange={()=>1} */ defaultValue={props.elementClick.data.value}
                      name="value" placeholder="Enter Value" required autoComplete="off" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group text-center mx-auto col-md-3">
                    <label className="text-white"></label>
                    <button type="submit" className="btn col-md-12 btn-dark">
                      Save
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

  if (show) {
    return (
      <div>
        <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
          <li className="dropdown-item" onClick={showModal} style={{ cursor: "pointer" }}>
            <strong className="dropdown-item">Edit</strong>
          </li>
          <li className="dropdown-item" onClick={onDelete} style={{ cursor: "pointer" }}>
            <strong className="dropdown-item">Delete</strong>
          </li>
        </ul>

      </div>
    );
  }
  return <>
    <Modal show={props.open} onHide={hideModal}>
      <ModalBody>
        <Form />
      </ModalBody>
    </Modal></>;
};
