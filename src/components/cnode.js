import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export const condicao = memo(({ data, isConnectable }) => {
  let value = "";
  if (data.value === undefined) {
    value = "";
  } else {
    value = data.value.substring(0, 15);
  }
  return (
    <div style={{
      transform: 'rotate(45deg)'
      }}>
      <div className="" style={{
        height: '100px',
        width: '100px',
        background: '#fcfcfc',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
      }}>
        <strong
        style={{
          width: '100%',
          height: '50%',
          textAlign: 'center',
          transform: 'rotate(-45deg)'
        }}>{value}</strong>
      </div>
      <Handle
        type="target"
        position="top"
        style={{ 
          background: '#555', 
          position: 'absolute',
          left: '0',
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="Sim"
        style={{ 
          background: '#555', 
          position: 'absolute',
          left: '0',
        }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="Nao"
        style={{ 
          background: '#555', 
          position: 'absolute',
          top: '0',
         }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const repiticao = memo(({ data, isConnectable }) => {
  let value = "";
  if (data.value === undefined) {
    value = "";
  } else {
    value = data.value.substring(0, 15);
  }
  return (
    <div style={{
      transform: 'rotate(45deg)'
      }}>
      <div className="" style={{
        height: '100px',
        width: '100px',
        background: '#fcfcfc',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
      }}>
        <strong
        style={{
          width: '100%',
          height: '50%',
          textAlign: 'center',
          transform: 'rotate(-45deg)'
        }}>{value}</strong>
      </div>
      <Handle
        type="target"
        position="top"
        style={{ 
          background: '#555', 
          position: 'absolute',
          left: '0',
        }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="Sim"
        style={{ 
          background: '#555', 
          position: 'absolute',
          left: '0',
        }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="Nao"
        style={{ 
          background: '#555', 
          position: 'absolute',
          left: '100%',
          // transform: 'rotate(45deg)'
         }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export const entrada = memo(({ data, isConnectable }) => {
  let value = "";
  if (data.value === undefined) {
    value = "";
  } else {
    value = data.value.substring(0, 15);
  }
  return (
    <>
      <div className="" style={{
        width: '138px',
        height: '40px',
        background: '#fcfcfc',
        border: '1px solid black',
        transform: 'skew(-20deg)',
        padding: '10px',
        fontSize: '12px',
        textAlign: 'center',
      }}>
        <strong>{value}</strong>
      </div>
      <Handle
        type="target"
        position="top"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
});

export const saida = memo(({ data, isConnectable }) => {
  let value = "";
  if (data.value === undefined) {
    value = "";
  } else {
    value = data.value.substring(0, 15);
  }
  return (
    <>
      <div className="" style={{
        width: '138px',
        height: '40px',
        border: '1px solid black',
        borderRadius: '0 50% 50% 0',
        padding: '10px',
        fontSize: '12px',
        background: '#fcfcfc',
        textAlign: 'center',
      }}>
        <strong>{value}</strong>
      </div>
      <Handle
        type="target"
        position="top"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
});
export const processo = memo(({ data, isConnectable }) => {
  let value = "";
  if (data.value === undefined) {
    value = "";
  } else {
    value = data.value.substring(0, 15);
  }
  return (
    <>
      <div className="" style={{
        width: '138px',
        height: '40px',
        border: '1px solid black',
        padding: '10px',
        fontSize: '12px',
        background: '#fcfcfc',
        textAlign: 'center',
      }}>
        <strong>{value}</strong>
      </div>
      <Handle
        type="target"
        position="top"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
});
export const ligacao = memo(({ data, isConnectable }) => {
  let value = "";
  if (data.value === undefined) {
    value = "";
  } else {
    value = data.value.substring(0, 15);
  }
  return (
    <>
      <div className="" style={{
        width: '40px',
        height: '40px',
        border: '1px solid black',
        borderRadius: '50%',
        padding: '10px',
        fontSize: '12px',
        background: '#fcfcfc',
        textAlign: 'center',
      }}>
        <strong>{value}</strong>
      </div>
      <Handle
        type="target"
        position="top"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
});