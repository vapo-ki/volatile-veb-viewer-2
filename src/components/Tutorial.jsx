import React, { useState } from 'react'
import './Tutorial.css'

export default function Tutorial() {
    const [showTut, setShowTut] = useState("tutorial-container")
    const handleOnClick = () => {
        setShowTut("tutorial-container tut-close")
    }
  return (
<div className={showTut} onClick={handleOnClick}>
        <div className="tutorial">
            <h2>Welcome to <span style={{color: "#df7126"}}>Volatile Veb Viewer</span></h2>
            <p>
                Hier kannst du 3D Modelle betrachten, ihre schönen Animationan abspielen, und mehr!<br/>
                Es gibt 3 Beispielmodelle, aber du kannst auch deine eigenen hochladen, indem du auf "Add new model" klickst.
            </p>
            <p>
                Ziehe nun eine <span style={{color: "#df7126"}}>ZIP</span>-Datei, welche entweder eine
                <span style={{color: "#df7126"}}> .obj, </span>
                <span style={{color: "#df7126"}}>.gltf </span>
                oder <span style={{color: "#df7126"}}>.glb</span> enthält, sowie die Texturen enthält.<br/>
                Am Besten funktionieren GLB dateien. <br/>
                Alle Dateien müssen in der ZIP direkt sein. KEINE Ordner dürfen sich in der ZIP befinden.<br/>
                Also nicht <span style={{color: "#df7126"}}>{"ZIP -> Verzeichnis -> model.gltf, textur.png"}</span> sondern <span style={{color: "#df7126"}}>{ "ZIP -> model.gltf, textur,png"}</span>.
            </p>
            <p>
                Wenn alles geklappt hat, siehst du oben neben den Beispielen dein Modell erscheinen, dann brauchst du einfach drauf zu klicken. <br/>
                Danach kannst du rechts in dem Menü das Model etwas verändern und unten Animationen abspielen.<br/>
                Viel spaß!
            </p>
        </div>
    </div>
  )
}
