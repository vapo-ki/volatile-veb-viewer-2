import React, { useEffect, useState } from 'react'
import './Stats.css'

export default function Stats({model, name}) {
  const [modelData, setModelData] = useState({})
  const [showName, setShowName] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    if (!model) return

    let objectCount = 0
    let verticesCount = 0
    let triCount = 0

    if (model.scene){
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
  
        if (name.name == "Cosmog" || name.name == "Calvin Freckle" || name.name == "Cloud Station") {
          setShowName(true)
          
        } else {
          setShowName(false)
        }
        
      })
    } else {
      model.traverse((res) => {
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
  
        if (name.name == "Cosmog" || name.name == "Calvin Freckle" || name.name == "Cloud Station") {
          setShowName(true)
          
        } else {
          setShowName(false)
        }
        
      })
    }

    
  }, [model])

  return (
    <div className="stats">
      <p>Stats <br/></p>
      <p>
        Objects: {modelData.objects}<br/>
        Tris: {modelData.tris}<br/>
        Vertices: {modelData.vertices}<br/>
      </p>
      { showName && <p>
        Author: {name.author_name} <br/>
        Source:   <a href={name.url} target='_blank' rel='noopener noreferrer'>Sketchfab</a>
      </p>}
    </div>
  )
}
