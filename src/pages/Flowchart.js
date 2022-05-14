import React, { useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';

import '../style/dnd.css';
import { Flowchart } from '../components/Flowchart';
import { Termina } from '../components/Terminal';
import { Navbar } from '../components/Navbar';
// import { Sidebar } from './components/Sidebar';
import { Code } from '../components/Code';
import { result } from '../utils/generateCode';
import initialNodes from "../utils/nodes";
import initialEdges from "../utils/edges";

const App = () => {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clique, setClique] = useState(false);
  const [cancelar, setCancelar] = useState(false);
  const [utilizador, setUtilizador] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadNodes, setUploadNodes] = useState(() => {
    if (typeof (localStorage) !== 'undefined') {
      if (localStorage.getItem("nodes") !== null) {
        return JSON.parse(localStorage.getItem("nodes"));
      }
    }
    return initialNodes;
  });
  const [uploadEdges, setUploadEdges] = useState(() => {
    if (typeof (localStorage) !== 'undefined') {
      if (localStorage.getItem("edges") !== null) {
        return JSON.parse(localStorage.getItem("edges"));
      }
    }
    return initialEdges;
  });

  const handleNode = (node) => {
    setNodes(node);
  }
  const handleEdge = (edge) => {
    setEdges(edge);
  }

  return (


    <div style={{ backgroundColor: "gray", width: "100%", height: "100vh", margin: "0 auto", padding: "0" }}>
      <div style={{ backgroundColor: "white", width: "100%", height: "5%", float: "top" }}>
        <Navbar
          resultNode={(e) => { setUploadNodes(JSON.parse(e)) }}
          resultEdge={(e) => { setUploadEdges(JSON.parse(e)) }}
          nodes={nodes}
          edges={edges}
          executar={() => { setClique(!clique) }}
          cancelar={() => { setCancelar(!cancelar) }}
          codigo={() => {/* setCodigo(!codigo) */ setIsOpen(true) }}
          // utilizador={() => { logout() }}
        />
      </div>
      <ReactFlowProvider>
        {/* <div style={{ backgroundColor: "green", width: "15%", height: "95%", float: "left" }}> */}
        {/* <strong style={{ height: "100px" }}>Div 1</strong> */}
        {/* <Sidebar /> */}
        {/* </div > */}
        <div style={{ width: "100%", height: "95%", float: "right" }}>
          <div style={{ backgroundColor: "white", width: "100%", height: "80%", float: "right" }}>
            {/* <strong style={{ height: "200px" }}>Div 2</strong> */}
            <Flowchart uploadNodes={uploadNodes} uploadEdges={uploadEdges} nodes={handleNode} edges={handleEdge} />
          </div>
          <div style={{ backgroundColor: "white", width: "100%", height: "20%", float: "right", }}>
            {/* <strong style={{ height: "100%" }}>Div 3</strong> */}
            <Termina nodes={nodes} edges={edges} clique={clique} cancelar={cancelar} />
          </div >
        </div >
      </ReactFlowProvider>
      <div style={{ clear: "both" }}></div>
      <Code open={isOpen} isOpen={(vl) => { setIsOpen(vl); }} codigo={result(nodes, edges, "start")} />
    </div >
  );
}
export default App;