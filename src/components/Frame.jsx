import React from "react";
import "./Frame.css";

export default function Frame({dragOver, dragExit}) {

  return (
    <>
      <div className="frame-left" onDragOver={dragOver} onDragExit={dragExit}/>
      <div className="frame-right" onDragOver={dragOver} onDragExit={dragExit}/>
      <div className="frame-up" onDragOver={dragOver} onDragExit={dragExit}/>
      <div className="frame-down" onDragOver={dragOver} onDragExit={dragExit}/>
    </>
  );
}
