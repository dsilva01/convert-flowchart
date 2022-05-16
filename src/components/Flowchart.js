import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  updateEdge,
  isEdge,
  useStore,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
// import { SmartEdge } from '@tisoap/react-flow-floating-edge';

import '../style/dnd.css';
import '../bootstrap/css/bootstrap.min.css';
import '../style/menu.css';
// import Cedge from '../components/cedge';
import { condicao, entrada, saida, processo, ligacao, repiticao } from '../components/cnode';
// import FloatingEdge from './FloatingEdge.js';
// import FloatingConnectionLine from './FloatingConnectionLine.js';
// import { createNodesAndEdges } from '../utils/utils';
// import cedge from '../components/cedge';
import { Menu } from './Menu';
import initialNodes from "../utils/nodes";
import initialEdges from "../utils/edges";
import { Type } from './Type';
import { CustomEdge } from './ButtonEdge';
import { Detail } from './Detail';

const nodeTypes = {
  entrada,
  saida,
  processo,
  condicao,
  ligacao,
  repiticao: repiticao,
};
const edgeTypes = {
  // cedge: cedge,
  // floating: SmartEdge,
  // floating: FloatingEdge,
  buttonedge: CustomEdge
};

const getId = () => `dndnode_${Math.floor(Math.random() * 10000)}`;

export const Flowchart = (props) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [elements, setElements] = useState(initialNodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [variables, setVariables] = useState([]);
  // const [selectElement, setSelectElement] = useState();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [type, setType] = useState("");
  const [contextMenuElement, setContextMenuElement] = useState({ data: { value: "" } });
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [anchorPoint2, setAnchorPoint2] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [edge, setEdge] = useState(null);

  // const transform = useStore((store) => store.connectionPosition);

  useEffect(() => {
    props.nodes(nodes);
    localStorage.setItem("nodes",
      JSON.stringify(nodes));
    props.edges(edges);
    localStorage.setItem("edges",
      JSON.stringify(edges));
    setVariables(() => {
      let vl = nodes.filter((el) => el.type === "entrada");
      let vl2 = [];
      // vl.push(el.data.value);
      // console.log(vl);
      vl.map((v) => {
        if (v.data.value !== undefined) {
          vl2.push({
            value: v.data.value,
            type: v.data.type,
          });
          // setVariables((vl) => vl.concat(data.element.value));
        }
        return v;
      })
      // vls.concat(vl);
      return vl2;
    });
  }, [nodes, edges]);

  useEffect(() => { setNodes(props.uploadNodes); setEdges(props.uploadEdges) }, [props.uploadNodes, props.uploadEdges]);

  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.1, includeHiddenNodes: false });
    }
  }, [props.image]);

  const handleClick = () => { setShow(false); document.removeEventListener("click", handleClick) };

  const onInit = (_reactFlowInstance) => {
    // _reactFlowInstance.fitView({ padding: 0.1, includeHiddenNodes: false });
    // _reactFlowInstance.zoomIn({ duration: 1000 });
    console.log("🚀 ~ file: Flowchart.js ~ line 99 ~ onInit ~ _reactFlowInstance", _reactFlowInstance);
    setReactFlowInstance(_reactFlowInstance);
  };
 
  const onEdgeClick = (event, edge) => {
  console.log("🚀 ~ file: Flowchart.js ~ line 106 ~ onEdgeClick ~ event", event)
    setPosition({ x: event.clientX - 70, y: event.clientY - 50 });
      setIsOpen2(true);
      setEdge(edge);
  };
  
  const onEdgeAddElement = (type) => {
    if (edge != null) {
      let element = edge;
      element.animated =  true;
      element.style =  { stroke: 'blue' };
      // let el_source = elements.find(e => e.id === element.source);
      let newNode = {
        id: getId(),
        type,
        position,
        data: { label: `node` },
      };
      let element2 = {
        ...edge,
        target: newNode.id,
        sourceHandle: edge.sourceHandle !== undefined ? edge.sourceHandle : null,
        targetHandle: edge.targetHandle !== undefined ? edge.targetHandle : null,
        type: "buttonedge",
        animated: true,
        style: { stroke: 'blue' },
      }
      onEdgeUpdate(edge, element2);
      setNodes((es) => es.concat(newNode));

      if (type === "condicao") {
        let lig = {
          id: `${newNode.id}endif`,
          type: "ligacao",
          position: { x: position.x - 50, y: position.y + 140 },
          data: { label: `node` },
        };
        setNodes((es) => es.concat(lig));

        setEdges((els) => {
          return addEdge({
            // ...params,
            id: `${newNode.id}dfs${lig.id}yes`,
            type: 'buttonedge',
            source: newNode.id,
            target: lig.id,
            sourceHandle: "Sim",
            label: "Sim",
            targetHandle: null,
            type: 'buttonedge',
            markerEnd: { type: 'arrowclosed' },
            animated: true,
            style: { stroke: 'blue' },
            // label: params.sourceHandle,
          }, els);
        });
        setEdges((els) => {
          return addEdge({
            // ...params,
            id: `${newNode.id}dfs${lig.id}no`,
            type: 'buttonedge',
            source: newNode.id,
            target: lig.id,
            sourceHandle: "Nao",
            label: "Nao",
            targetHandle: null,
            type: 'buttonedge',
            markerEnd: { type: 'arrowclosed' },
            animated: true,
            style: { stroke: 'blue' },
            // label: params.sourceHandle,
          }, els);
        });
        setEdges((els) => {
          return addEdge({
            // ...params,
            id: `${lig.id}dfs${element.target}`,
            type: 'buttonedge',
            source: lig.id,
            target: element.target,
            sourceHandle: null,
            targetHandle: null,
            type: 'buttonedge',
            markerEnd: { type: 'arrowclosed' },
            animated: true,
            style: { stroke: 'blue' },
            // label: params.sourceHandle,
          }, els);
        });

        setEdges((els) =>
          els.map((el) => {
            if (el.id === element.target) {
              el.position = { x: el.position.x, y: el.position.y + 20 }
              el.animated =  true;
              el.style =  { stroke: 'blue' };
            }
            return el;
          })
        );
        
      } else if (type === "repiticao") {

        setEdges((els) => {
          return addEdge({
            // ...params,
            id: `${newNode.id}dfs${newNode.id}yes`,
            type: 'buttonedge',
            source: newNode.id,
            target: newNode.id,
            sourceHandle: "Sim",
            label: "Sim",
            targetHandle: null,
            type: 'buttonedge',
            markerEnd: { type: 'arrowclosed' },
            animated: true,
            style: { stroke: 'blue' },
            // label: params.sourceHandle,
          }, els);
        });
        setEdges((els) => {
          return addEdge({
            // ...params,
            id: `${newNode.id}dfs${element.target}no`,
            type: 'buttonedge',
            source: newNode.id,
            target: element.target,
            sourceHandle: "Nao",
            label: null,
            targetHandle: null,
            type: 'buttonedge',
            markerEnd: { type: 'arrowclosed' },
            animated: true,
            style: { stroke: 'blue' },
            // label: params.sourceHandle,
          }, els);
        });
        // setElements((els) => {
        //   return addEdge({
        //     // ...params,
        //     id: `${lig.id}dfs${element.target}`,
        //     type: 'buttonedge',
        //     source: lig.id,
        //     target: element.target,
        //     sourceHandle: null,
        //     targetHandle: null,
            // type: 'buttonedge',
        //    "markerEnd":{"type": 'arrowclosed'},
        //     // label: params.sourceHandle,
        //   }, els);
        // });

        setEdges((els) =>
          els.map((el) => {
            if (el.id === element.target) {
              el.position = { x: el.position.x, y: el.position.y + 20}
              el.animated = true;
              el.style = { stroke: 'blue' };
            }
            return el;
          })
        );
        
      }else {
        setEdges((els) => {
          return addEdge({
            // ...params,
            id: `${newNode.id}dfs${element.target}`,
            type: 'buttonedge',
            source: newNode.id,
            target: element.target,
            sourceHandle: null,
            targetHandle: null,
            type: 'buttonedge',
            markerEnd: { type: 'arrowclosed' },
            animated: true,
            style: { stroke: 'blue' },
            // label: params.sourceHandle,
          }, els);
        });
      }  
    }
  }
  const onEdgeUpdate = (oldEdge, newConnection) => setEdges((els) => { return updateEdge(oldEdge, newConnection, els)});
  // const onSelelectEelemet = (elements) => { setSelectElement(elements); };

  const onNodeDelete = (elementsToRemove) => {
    elementsToRemove.forEach(element => {
      let sources = edges.filter(e => e.target == element.id);
      let target = edges.find(e => e.source == element.id && e.source !== e.target);
      if (element.type == "repiticao" && edges.find(e => e.source == element.id && e.source !== e.target && e.sourceHandle == "Sim") !== undefined) {
        target = edges.find(e => e.source == element.id && e.source !== e.target && e.sourceHandle == "Sim");
      } else{
        target = edges.find(e => e.source == element.id && e.source !== e.target);
      }
      // console.log(target);
      if (target !== undefined) {
        sources.forEach(source => {
          let newSource = {
            ...source,
            target: target.target,
            // sourceHandle: null,
            animated: true,
            style: { stroke: 'blue' },
          };
          // newSource.target = target.target;
          onConnect(newSource);
          // onEdgeUpdate(source, newSource);
        });
      }
    });

    setShow2(false);

  }

  const onConnect = (params) => setEdges((els) => {
    return addEdge({
      ...params,
      type: 'buttonedge',
      type: 'buttonedge',
     markerEnd:{type: 'arrowclosed'},
      label: params.sourceHandle,
      animated: true,
      style: { stroke: 'blue' },
    }, els);
  });
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  const onDrop = (event) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((es) => es.concat(newNode));
  };

  const onNodeContextMenu = (event, element) => {
    if (element.id !== "start" && element.id !== "end") {
      setContextMenuElement(element);
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow2(false);
      setShow(true);
      document.addEventListener("click", handleClick);
    }
  }
  const onNodeMouseEnter = (event, element) => {
    // setContextMenuElement(element);
    setTimeout(() => {
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setType(element.type);
      setShow2(true);

    }, 10)
    let hideDiv = document.getElementsByClassName('react-flow__node-repiticao');
    hideDiv = Array.from(hideDiv);
    hideDiv.forEach(element => {
      element.style.zIndex = '0';
    });
    // hideDiv.classList.add('esconder');
    // document.addEventListener("click", handleClick);
  }
  const onNodeMouseLeave = (event, element) => {
    // let x = event.pageX;
    // let y = event.pagey;
    // setAnchorPoint({ x: event.pageX, y: event.pageY });
    // if ((450 - event.pageX) < 0) event.pageX -= 450;
    // if ((270 - event.pagey) < 0) event.pagey -= 270;
    setAnchorPoint2({ x: event.pageX, y: event.pageY });
    setShow2(false);
    let hideDiv = document.getElementsByClassName('react-flow__node-repiticao');
    hideDiv = Array.from(hideDiv);
    hideDiv.forEach(element => {
      element.style.zIndex = '0';
    });
    // hideDiv.classList.add('esconder');
    // document.addEventListener("click", handleClick);
  }

  const onNodeDoubleClick = (event, element) => {
    if (element.id !== "start" && element.id !== "end") {
      setContextMenuElement(element);
      setShow2(false);
      setIsOpen(true);
      let hideDiv = document.getElementsByClassName('react-flow__node-repiticao');
      hideDiv = Array.from(hideDiv);
      hideDiv.forEach(element => {
        element.style.zIndex = '0';
      });
      // hideDiv.classList.add('esconder');
    }
  }

  const updateDate = (data) => {
    if (contextMenuElement) {
      if (data.type === "update") {
        setNodes((els) => {
          els = els.map((el) => {
            if (el.id !== contextMenuElement.id) {
              return el;
            }
            // console.log(data.value.length);
            // console.log(variables.filter((vl) => vl !== data.value).length === 0);
            if (contextMenuElement.type === "entrada") {
              let va = variables.find((v) => v.value === data.element.value);
              if (va === undefined || va.length <= 1) {
                return {
                  ...el,
                  data: {
                    ...el.data,
                    label: data.element.value,
                    value: data.element.value,
                    type: data.element.type,
                  },
                };
              }
              return el;
            } else if (contextMenuElement.type === "processo") {
              if (data.element.checked) {
                data.element.value = "";
              }
              return {
                ...el,
                data: {
                  ...el.data,
                  label: `${data.element.variable}=${data.element.value}`,
                  value: `${data.element.variable}=${data.element.value}`,
                  variable: data.element.variable,
                  pre_value: data.element.value,
                  checked: data.element.checked,
                  type: data.element.type,
                },
              };
            } else {
              return {
                ...el,
                data: {
                  ...el.data,
                  label: data.element.value,
                  value: data.element.value,
                },
              };
            }
          });
          // console.log(els[0].data);
          return els;
        });
      } else if (data.type === "delete") {
        // onNodeDelete([contextMenuElement]);
      }
    }
  }


  return (
    <div className="col" ref={reactFlowWrapper} style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        onInit={onInit}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
        // onEdgeUpdate={onEdgeUpdate}
        onEdgeClick={onEdgeClick}
        // onEdgeUpdate={() => {}}
        // onElementClick={onElementClick}
        // onSelectionChange={onSelelectEelemet}
        connectionLineType="smoothstep"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDoubleClick={onNodeDoubleClick}
        edgeTypes={edgeTypes}
        onNodesDelete={onNodeDelete}
        deleteKeyCode="Delete"
        multiSelectionKeyCode="Alt"
        onNodeContextMenu={onNodeContextMenu}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeDrag={onNodeMouseLeave}
        // connectionLineComponent={FloatingConnectionLine}
      >
        <Controls showInteractive={false} />
      </ReactFlow>
      <Menu elementClick={contextMenuElement} variables={variables} action={updateDate} show={show} anchorPoint={anchorPoint} open={isOpen} isOpen={(vl) => { setIsOpen(vl); }} />
      <Detail show={show2} type={type} anchorPoint={anchorPoint2} />
      <Type anchorPoint={position} open={isOpen2} isOpen={(vl) => { setIsOpen2(vl); }} type={onEdgeAddElement} />
    </div>
  );
}