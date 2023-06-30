import React, { useState } from "react";
import "./Header.css";
import HeaderTab from "./HeaderTab";
import HeaderTabAdd from "./HeaderTabAdd";

export default function Header({handleTabButton, handleAddButton, modelList}) {
  return (
    <>
      <div className="top-left-color" />
      <header>
        <div className="logo">
          <div className="logo-text">
            <span>V</span>olatile
            <br />
            <span>V</span>eb <span>V</span>iewer
          </div>
        </div>
        <div className="header-tabs-container">
          {modelList.map(model => 
            <HeaderTab key={model.id} handleTabButton={() => handleTabButton(model.id)} model={model} />
          )}
          <HeaderTabAdd handleAddButton={handleAddButton}/>
        </div>
      </header>
    </>
  );
}
