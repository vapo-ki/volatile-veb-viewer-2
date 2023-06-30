import "./App.css";
import Viewer from "./viewer/Viewer";
import Menu from "./components/Menu";
import DragDrop from "./components/DragDrop";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { getLocalModel, getModel } from './utils/HandleTabs'
import AnimFooter from "./components/AnimFooter";
import Stats from "./components/Stats";

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
