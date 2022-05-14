import React from 'react';

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  // console.log(event);
  event.dataTransfer.effectAllowed = 'move';
};

export const Sidebar = () => {
  return (
    <aside className="sidebar" style={{width: '100%', height: '100%'}}>
      <div className="description">Componentes</div>
      <div className="entrada" onDragStart={(event) => onDragStart(event, 'entrada')} draggable>
        <strong>Entrada</strong>
      </div>
      <div className="saida" onDragStart={(event) => onDragStart(event, 'saida')} draggable>
        <strong>Saida</strong>
      </div>
      <div className="processo" onDragStart={(event) => onDragStart(event, 'processo')} draggable>
        <strong>Processo</strong>
      </div>
      <div className="condicao" onDragStart={(event) => onDragStart(event, 'condicao')} draggable>
        <div>
        <strong>Condicao</strong>
        </div>
      </div>
    </aside>
  );
};