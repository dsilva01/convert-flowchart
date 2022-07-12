import { useContextMenu } from "./Contextmenu";

export const Detail = (props) => {

  useContextMenu();

  const hideModal = () => {
    props.isOpen(false);
  };

  const onTrigger = (event, type) => {
    event.preventDefault();
    props.type(type);
    hideModal();
  }
  if (props.show) {
    if (props.type === 'entrada') {
      return (
        <div>
          <ul className="menu" style={{ top: props.anchorPoint.y, left: props.anchorPoint.x, width: '450px', height: '270px' }}>
            <li className="dropdown-item"style={{ cursor: "pointer" }}>
              <section id="idocs_accordion">
                <h2>Entrada</h2>
                <p>O componente <strong>Entrada</strong> é utilizado para criar variaveis</p>
                <p><a className="popup-img" href="assets/images/accordion.jpg"><img className="img-fluid border" src="assets/images/accordion.jpg" alt="" /></a></p>
                <h4>Options:</h4>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Campos</th>
                        <th>Recurso</th>
                        <th>Exemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Tipo</strong></td>
                        <td>Campo para selecionar o tipo de variavel</td>
                        <td><pre className="mb-0">inteiro</pre></td>
                      </tr>
                      <tr>
                        <td><strong>Nome</strong></td>
                        <td>Campo para declarar o nome da variavel</td>
                        <td><pre className="mb-0">numero</pre></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </li>
          </ul>
        </div>
      );
    } else if (props.type === 'saida') {
      return (
        <div>
          <ul className="menu" style={{ top: props.anchorPoint.y, left: props.anchorPoint.x, width: '450px' }}>
            <li className="dropdown-item"style={{ cursor: "pointer" }}>
              <section id="idocs_tabs">
                <h2>Saida</h2>
                <p>O componente <strong>Saida</strong> é utilizado para imprimer valores</p>
                <p><a className="popup-img" href="assets/images/accordion.jpg"><img className="img-fluid border"
                  src="assets/images/accordion.jpg" alt=""/></a></p>
                <h4>Options:</h4>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Campos</th>
                        <th>Recurso</th>
                        <th>Exemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Valor</strong></td>
                        <td>Campo para digitar o valor a ser imprimido</td>
                        <td>
                          <pre className="mb-0">"Ola Mundo!"</pre>
                        </td>
                      </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
            </li>
          </ul>
        </div>
      );
    } else if (props.type === 'processo') {
      return (
        <div>
          <ul className="menu" style={{ top: props.anchorPoint.y, left: props.anchorPoint.x, width: '450px' }}>
            <li className="dropdown-item"style={{ cursor: "pointer" }}>
              <section id="idocs_social_icon">
                <h2>Processo</h2>
                <p>O componente <strong>Processo</strong> é utilizado para atribuir valores a variaveis</p>
                <p><a className="popup-img" href="assets/images/accordion.jpg"><img className="img-fluid border"
                  src="assets/images/accordion.jpg" alt=""/></a></p>
                <h4>Options:</h4>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Campos</th>
                        <th>Recurso</th>
                        <th>Exemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Variavel</strong></td>
                        <td>Campo para selecionar a variavel</td>
                        <td>
                          <pre className="mb-0">numero</pre>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Ler Vallor</strong></td>
                        <td>Campo para definir se o valor vai ser atribuido ou scaneado</td>
                        <td>
                          <pre className="mb-0"></pre>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Valor</strong></td>
                        <td>Campo para atribuir o variavel</td>
                        <td>
                          <pre className="mb-0">10</pre>
                        </td>
                      </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
            </li>
            {/* <li className="dropdown-item" style={{cursor: "pointer"}}>Copiar</li>
            <li className="dropdown-item" style={{cursor: "pointer"}}>Colar</li> */}
          </ul>
        </div>
      );
    } else if (props.type === 'condicao') {
      return (
        <div>
          <ul className="menu" style={{ top: props.anchorPoint.y, left: props.anchorPoint.x, width: '450px' }}>
            <li className="dropdown-item"style={{ cursor: "pointer" }}>
              <section id="idocs_condition">
                <h2>Condição</h2>
                <p>O componente <strong>Condição</strong> é utilizado para criar condições</p>
                <p><a className="popup-img" href="assets/images/accordion.jpg"><img className="img-fluid border"
                  src="assets/images/accordion.jpg" alt=""/></a></p>
                <h4>Options:</h4>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Campos</th>
                        <th>Recurso</th>
                        <th>Exemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Valor</strong></td>
                        <td>Campo para digitar a condição</td>
                        <td>
                          <pre className="mb-0">{"numero > 10"}</pre>
                        </td>
                      </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
            </li>
            {/* <li className="dropdown-item" style={{cursor: "pointer"}}>Copiar</li>
            <li className="dropdown-item" style={{cursor: "pointer"}}>Colar</li> */}
          </ul>
        </div>
      );
    }  else if (props.type === 'repiticao') {
      return (
        <div>
          <ul className="menu" style={{ top: props.anchorPoint.y, left: props.anchorPoint.x, width: '450px' }}>
            <li className="dropdown-item"style={{ cursor: "pointer" }}>
              <section id="idocs_condition">
                <h2>Repitição</h2>
                <p>O componente <strong>repitição</strong> é utilizado para criar repitição</p>
                <p><a className="popup-img" href="assets/images/accordion.jpg"><img className="img-fluid border"
                  src="assets/images/accordion.jpg" alt=""/></a></p>
                <h4>Options:</h4>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Campos</th>
                        <th>Recurso</th>
                        <th>Exemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Valor</strong></td>
                        <td>Campo para digitar a repitição</td>
                        <td>
                          <pre className="mb-0">{"numero <= 10"}</pre>
                        </td>
                      </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
            </li>
            {/* <li className="dropdown-item" style={{cursor: "pointer"}}>Copiar</li>
            <li className="dropdown-item" style={{cursor: "pointer"}}>Colar</li> */}
          </ul>
        </div>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

// export default Menu;