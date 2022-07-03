import React from 'react';
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import html2canvas from 'html2canvas';

import initialNodes from "../utils/nodes";
import initialEdges from "../utils/edges";

export const Navbar = (props) => {

  const handleClick = () => {
    let dn = document.createElement("a");
    let elements = {
      nodes: props.nodes,
      edges: props.edges,
    }
        dn.href = `data:application/json;charset=utf-8,${JSON.stringify(elements, null, 1)}`
        dn.download = `fluxograma ${Date.now()}`;
        dn.click();
  }

  const handleClick2 = () => {
    let up = document.getElementById("upload_fl");
    up.style = "display: flex";
    up.click();
  }

  const handleImage = () => {
    props.image(true);
  //   html2canvas(document.querySelector('.react-flow')).then(canvas => {
  //   // html2canvas(document.querySelector('.asa')).then(canvas => {
  //     document.body.appendChild(canvas);
  // });
    // let up = document.getElementById("upload_fl");
    // up.style = "display: flex";
    // up.click();
  }

  const handleChange = (e) => {
    let files = e.target.files;
    if(files.length > 0) {
      if(files[0].type === "application/json") {
        const reader = new FileReader()
        reader.onload = (ev) => {
          let elements = JSON.parse(ev.target.result);
          props.resultNode(JSON.stringify(elements.nodes));
          props.resultEdge(JSON.stringify(elements.edges));
          document.getElementById("upload_fl").value = "";
        };
        reader.readAsText(files[0]);
      }
    }
  }

  const handleClean = () => {
    props.resultNode(JSON.stringify(initialNodes));
    props.resultEdge(JSON.stringify(initialEdges));
  }

  return (

    <div className="d-flex justify-content-between">
      <div className='text-primary px-2'>
        <strong>
        Flowchart Convert
        </strong>
      </div>
      <div>
        <Nav variant="pills" activeKey="1">
          <NavDropdown title="File" id="nav-dropdown">
            <NavDropdown.Item onClick={() => { handleClean() }}>
              New
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => { handleClick() }}>
              Download
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => { handleClick2() }}>
              Upload
              <div>
              </div>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => { handleImage() }}>
              Export an image
            </NavDropdown.Item>
            <input id="upload_fl" type="file" hidden onChange={(e) => { handleChange(e) }} />
          </NavDropdown>
          <Nav.Item>
            <Nav.Link>
              <span onClick={() => props.executar(true)}>Start</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <span onClick={() => props.cancelar(true)}>Stop/Clear</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <span onClick={() => props.codigo(true)}>Code in Java</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
    //       </li>
    //     </ul>
    //   </div>
    // </nav> 
  );
}