import "./Viewer.css";
import { useEffect, useState } from "react";
import ViewerInit from "./ViewerInit";
import { loadModel } from "../utils/Loader";
import * as THREE from 'three'

function Viewer({ model, setModel, setCanvas}) {
  const [canvas, setCanvasViewer] = useState(new ViewerInit("canvas"));
  const [ modelInstance, setModelInstance] = useState(null);

  useEffect(() => {
    canvas.initialize();
    canvas.animate();
  }, []);

  useEffect(() => {
    while (canvas.scene.children.length > 3) {
      canvas.scene.remove(canvas.scene.children[3]);
    }

    if (!model) return

    loadModel(canvas.scene, model)
    .then((res) => {
      setModelInstance(res)
      canvas.mixer = new THREE.AnimationMixer(res.scene)
      res["type"] = model.type
      setModel(res)
    })

    setCanvas(canvas)
  }, [model]);

  return (
    <div className="viewer">
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default Viewer;
