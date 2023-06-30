import React, { useState, useEffect } from "react";
import { GUI } from "dat.gui";
import "./Menu.css";
import * as THREE from "three";

export default function Menu({ object, canvas }) {
  const [gui, setGui] = useState(null);

  useEffect(() => {
    if (!object) return;
    if (gui) gui.destroy();
    
    setGui(new GUI());
    
  }, [object]);

  useEffect(() => {
    if (!object) return;
    if (!gui) return 

    let model = object;
    if (object.type != "obj") {
      model = object.scene;
    }
    
    const menu = gui.addFolder("Menu");

    const controls = menu.addFolder("Controls");
    controls.add(model.position, "x", -10, 10).name("Move X");
    controls.add(model.position, "y", -10, 10).name("Move Y");
    controls.add(model.position, "z", -10, 10).name("Move Z");

    controls.add(model.rotation, "x", 0, Math.PI * 2).name("Rotate X");
    controls.add(model.rotation, "y", 0, Math.PI * 2).name("Rotate Y");
    controls.add(model.rotation, "z", 0, Math.PI * 2).name("Rotate Z");

    let scaleParam = { scale: 1 };
    controls.add(model.scale, "x", 0, 10).name("Scale X");
    controls.add(model.scale, "y", 0, 10).name("Scale Y");
    controls.add(model.scale, "z", 0, 10).name("Scale Z");
    controls
      .add(scaleParam, "scale", 0, 10)
      .name("Scale XYZ")
      .onChange(setScale);
    function setScale() {
      var nonZeroScale = Math.max(scaleParam.scale, 0.001);
      model.scale.set(nonZeroScale, nonZeroScale, nonZeroScale);
    }

    const environment = menu.addFolder("Environment");
    var environmentParams =  {
      color: 0xffffff
    }
    environment.addColor(environmentParams, 'color').onChange(function() {canvas.scene.background = new THREE.Color(environmentParams.color)})

    menu.open();
  }, [gui]);

  return <div className="menu"></div>;
}
