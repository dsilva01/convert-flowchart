import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export const Entrada = memo(({ data, isConnectable }) => {
  return (
    <>
      {/* <div>
        Custom Color Picker Node: <strong>{data.color}</strong>
      </div> */}
      <div className="circle" style={{
        height: '50px',
        width: '50px',
        // backgroundColor: '#555',
        background: '#fcfcfc',
        border: '1px solid black',
        transform: 'rotate(45deg)',
        // borderRadius: '50%'
      }}></div>
      <input
        className="nodrag"
        type="text"
        // onChange={data.onChange}
        // defaultValue={data.color}
      />
      <Handle
        type="target"
        position="top"
        style={{ background: '#555', marginTop: '-10px' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="l"
        style={{ background: '#555', marginLeft: '-10px' }}
        // onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#555', marginRight: '-10px' }}
        isConnectable={isConnectable}
      />
    </>
  );
});

export const entrada = memo(({ data, isConnectable }) => {
  return (
    <>
      <div className="circle" style={{
        width: '138px',
        height: '40px',
        // backgroundColor: '#555',
        border: '1px solid black',
        transform: 'skew(-20deg)',
        padding: '10px',
        fontSize: '12px',
        background: '#fcfcfc',
        textAlign: 'center',
        // borderRadius: '50%'
      }}></div>
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
  return (
    <>
      <div className="circle" style={{
        width: '138px',
        height: '40px',
        // backgroundColor: '#555',
        border: '1px solid black',
        borderRadius: '0 50% 50% 0',
        padding: '10px',
        fontSize: '12px',
        background: '#fcfcfc',
        textAlign: 'center',
        // borderRadius: '50%'
      }}></div>
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
  return (
    <>
      <div className="circle" style={{
        width: '138px',
        height: '40px',
        // backgroundColor: '#555',
        border: '1px solid black',
        padding: '10px',
        fontSize: '12px',
        background: '#fcfcfc',
        textAlign: 'center',
        // borderRadius: '50%'
      }}></div>
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