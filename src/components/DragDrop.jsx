import React, { useState } from "react";
import "./DragDrop.css";
import getUnzippedFiles from "../utils/HandleUpload";

function dragButton() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dragdrop-svg"
    >
      <g id="Frame 1" clipPath="url(#clip0_1_2)">
        <g id="group">
          <path
            id="arrow"
            d="M48 54.1066L63.536 69.6426C63.792 69.8986 64.208 69.8986 64.464 69.6426L80 54.1066"
            stroke="#222034"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="base"
            d="M16 64.7732V70.1066V86.1066C16 91.9978 20.7756 96.7732 26.6667 96.7732H101.333C107.225 96.7732 112 91.9978 112 86.1066V70.1066V64.7732"
            stroke="#222034"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="128" height="128" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function DragDrop({ setModel, onExit }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragExit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    if (file.type !== "application/x-zip-compressed") {
      return;
    }

    getUnzippedFiles(file).then((files) => {
      console.log(files);
      setModel(files)
    });
  };

  return (
    <div className="dragdrop-screen" >
      <div className="dragdrop" onClick={onExit}
      onDragEnter={(event) => handleDragEnter(event)}
      onDragOver={(event) => handleDragOver(event)}
      onDragExit={(event) => handleDragExit(event)}
      onDrop={(event) => handleOnDrop(event)}>
        <div
          className={
            isDragging ? "dragdrop-box dragdrop-box--over" : "dragdrop-box"
          }
          
        >
          <div className="dragdrop-svg-box">{dragButton()}</div>
          <h1>Drag 'n' Drop your file here</h1>
          <input type="file" name="3dFile" className="drop-zone"></input>
        </div>
      </div>
    </div>
  );
}
