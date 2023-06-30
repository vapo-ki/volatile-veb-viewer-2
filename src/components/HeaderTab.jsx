import React, { useEffect, useState } from "react";
import "./HeaderTab.css";
import ViewerInit from "../viewer/ViewerInit";
import { loadModel } from "../utils/Loader";

export default function HeaderTab({ handleTabButton, model }) {
  const [canvas, setCanvasViewer] = useState(
    new ViewerInit("canvas" + model.id, true)
  );
  const [left, setLeft] = useState({
    left: String(176 + model.id * 130 + "px"),
  });

  useEffect(() => {
    

    canvas.initialize();
    canvas.animate();

    loadModel(canvas.scene, model)

    if (model.name == "Cosmog") {
      canvas.camera.position.z = 1;
      canvas.camera.position.y = 0.5;
    }
  }, []);

  const handleTabHover = () => {
    canvas.camera.fov = 1.5
  }

  return (
    <>
      <div className="header-wrapper">
        <div className="header-tab-bg" />
        <div className="header-tab">
          <canvas
            id={"canvas" + model.id}
            className="tab-canvas"
            style={left}
          ></canvas>
          <button onFocus={handleTabHover} onClick={() => handleTabButton(model)}></button>
          <p>{model.name ? model.name : "Model " + model.id}</p>
        </div>
      </div>
    </>
  );
}
