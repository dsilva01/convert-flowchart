import React, { useState } from 'react';

import { getMarkerEnd, getBezierPath, getEdgeCenter } from 'react-flow-renderer';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
  borderRadius = 5,
}) {

  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const [Ratio, setRatio] = useState(15);

  const [centerX, centerY] = getEdgeCenter({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <g>
        <path id={id} style={{ ...style, stroke: "#BBC7D5" }} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />

        <g onMouseEnter={
          () => {
            setRatio(20)
          }
        } onMouseLeave={
          () => {
            setRatio(15)
          }
        } width={20} style={{
          width: 20
        }}>
          <circle fill="#D04881" style={{
            cursor: "pointer"
          }} className="avoid-clicks" cx={centerX} cy={centerY} onMouseEnter={
            () => {
              setRatio(20)
            }
          } r={Ratio} />
          <svg version="1.1" width="20px" height="20px" x={(centerX - 10) + "px"} y={(centerY - 10) + "px"}
            viewBox="0 0 330 330" >
            <path fill="#fff" d="M240,121.076V90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15
	v45H45H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15v185c0,8.284,6.716,15,15,15h60h37.596c19.246,24.347,49.031,40,82.404,40
	c57.897,0,105-47.103,105-105C330,172.195,290.817,128.377,240,121.076z M210,121.076c-10.588,1.521-20.671,4.625-30,9.069V90h15
	h15V121.076z M90,30h90v30h-15h-60H90V30z M60,90h15h15v170H60V90z M120,260v-35V90h30v61.596c-18.546,18.946-30,44.86-30,73.404
	c0,12.268,2.122,24.047,6.006,35H120z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75S266.355,300,225,300z"
            />
            <path fill="#fff" d="M256.819,193.181c-5.857-5.857-15.355-5.857-21.213,0L225,203.787l-10.606-10.606c-5.857-5.857-15.355-5.857-21.213,0
	c-5.858,5.857-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.857-5.858,15.355,0,21.213
	c2.929,2.929,6.768,4.394,10.606,4.394s7.678-1.465,10.606-4.394L225,246.213l10.606,10.606c2.929,2.929,6.768,4.394,10.606,4.394
	s7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213L246.213,225l10.606-10.606
	C262.678,208.536,262.678,199.038,256.819,193.181z"/>
          </svg>
        </g>
      </g>
    </>
  )};