import React, { useState } from 'react'
import './HeaderTab.css'

export default function HeaderTab({handleTabButton, modelName}) {
    const [ model, setModel ] = useState(modelName)
    
    return (
    <div className='header-tab'>
        <button onClick={() => handleTabButton(model)} >{modelName} </button>
    </div>
  )
}
