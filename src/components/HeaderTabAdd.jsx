import React from "react";
import "./HeaderTabAdd.css";

export default function HeaderTabAdd({ handleAddButton }) {
  return (
    <div className="header-wrapper">
      <div className="header-tab-bg" />
      <div className="header-tab">
        <button onClick={handleAddButton}>Add new model</button>
      </div>
    </div>
  );
}
