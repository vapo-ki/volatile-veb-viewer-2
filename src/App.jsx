import "./App.css";
import Viewer from "./viewer/Viewer";
import Menu from "./components/Menu";
import DragDrop from "./components/DragDrop";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { getModel } from './utils/HandleTabs'
import AnimFooter from "./components/AnimFooter";
import Stats from "./components/Stats";

function getLocalModel(modelId) {
  const examples = [
      {
          name: "Calvin Freckle",
          path: '/calvin_freckle/calvin_freckle_mcmurray_from_lackadaisy.glb',
          type: "gltf"
      },
      {
          name: "Cosmog",
          path: '/cosmog.glb',
          type: "glb"
      },
      {
          name: "Cloud Station",
          path: '/cloud_station.glb',
          type: "glb"
      }
  ]

  return {
      local: true,
      id: modelId,
      name: examples[modelId].name,
      type: examples[modelId].type,
      path: examples[modelId].path
  }
}

const examples = [
  {
    id: 0,
    name: "Calvin Freckle",
  },
  {
    id: 1,
    name: "Cosmog"
  },
  {
    id: 2,
    name: "Cloud Station"
  }
]

function InitializeExamples() {
  const modelList = []
  for (let i = 0; i < examples.length; i++) {
    modelList.push(getLocalModel(i))
  }
  return modelList
}

function App() {
  const [modelList, setModelList] = useState([])
  const [modelToShow, setModelToShow] = useState(null);
  const [showDrop, setShowDrop] = useState(false);
  const [liveModel, setLiveModel] = useState()
  const [canvas, setCanvas] = useState()

  useEffect(() => {
    setModelList(InitializeExamples())
  }, [])

  const handleTabButton = (modelId) => {
    setModelToShow(modelList[modelId])
  }

  const handleAddButton = () => {
    setShowDrop(!showDrop)
  }

  const handleDropButton = (model) => {
    setModelList( modelList => [...modelList, getModel(model, modelList.length)] )
    setShowDrop(false)
  }

  return (
    <>
      <Header handleTabButton={handleTabButton} handleAddButton={handleAddButton} modelList={modelList} />
      {showDrop && <DragDrop  setModel={handleDropButton} onExit={handleAddButton}/> }
      <Stats model={liveModel}/>
      <Menu object={liveModel}/>
      <AnimFooter model={liveModel} canvas={canvas} />
      <Viewer model={modelToShow} setModel={setLiveModel} setCanvas={setCanvas}/>
    </>
  );
}

export default App;
