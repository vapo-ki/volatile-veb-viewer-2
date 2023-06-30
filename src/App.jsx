import "./App.css";
import Viewer from "./viewer/Viewer";
import Menu from "./components/Menu";
import DragDrop from "./components/DragDrop";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { getModel } from './utils/HandleTabs'
import AnimFooter from "./components/AnimFooter";
import Stats from "./components/Stats";
import Tutorial from "./components/Tutorial";

function getLocalModel(modelId) {
  const examples = [
    {
        name: "Calvin Freckle",
        path: '/calvin_freckle/calvin_freckle_mcmurray_from_lackadaisy.glb',
        type: "gltf",
        url: "https://sketchfab.com/3d-models/calvin-freckle-mcmurray-from-lackadaisy-25b9b28a44dc47b2b07655692de5c3e1",
        author_name: "Avilash291"
    },
    {
        name: "Cosmog",
        path: '/cosmog.glb',
        type: "glb",
        url: "https://sketchfab.com/3d-models/cosmog-d928b7339a9b4ecb841162c53b4c4f4a",
        author_name: "AlmondFeather"
    },
    {
        name: "Cloud Station",
        path: '/cloud_station.glb',
        type: "glb",
        url: "https://sketchfab.com/3d-models/cloud-station-26f81b24d83441ba88c7e80a52adbaaf",
        author_name: "Alexa Kruckenberg"
    }
]

return {
    local: true,
    id: modelId,
    name: examples[modelId].name,
    type: examples[modelId].type,
    path: examples[modelId].path,
    url: examples[modelId].url,
    author_name: examples[modelId].author_name
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
      <Tutorial />
      <Header handleTabButton={handleTabButton} handleAddButton={handleAddButton} modelList={modelList} />
      {showDrop && <DragDrop  setModel={handleDropButton} onExit={handleAddButton}/> }
      <Stats model={liveModel} name={modelToShow}/>
      <Menu object={liveModel} canvas={canvas}/>
      <AnimFooter model={liveModel} canvas={canvas} />
      <Viewer model={modelToShow} setModel={setLiveModel} setCanvas={setCanvas}/>
    </>
  );
}

export default App;
