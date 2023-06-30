import React, { useEffect, useState } from 'react'
import './Stats.css'

export default function Stats({model}) {
  const [modelData, setModelData] = useState({})

  useEffect(() => {
    if (!model) return

    let objectCount = 0
    let verticesCount = 0
    let triCount = 0

    console.log("MODEL", model);
    model.scene.traverse((res) => {
      if (res.isMesh) {
        objectCount++

        if (res.isMesh) {
          verticesCount += res.geometry.attributes.position.count

          if (res.geometry.index !== null) {
            triCount += res.geometry.index.count / 3
          } else {
            triCount += res.geometry.attributes.position.count / 3
          }
        }
      }

      setModelData({
        objects: objectCount,
        vertices: verticesCount,
        tris: triCount
      })
      
    })
  }, [model])

  return (
    <div className="stats">
      <p>Stats <br/></p>
      <p>
        Objects: {modelData.objects}<br/>
        Tris: {modelData.tris}<br/>
        Vertices: {modelData.vertices}<br/>
      </p>
    </div>
  )
}
