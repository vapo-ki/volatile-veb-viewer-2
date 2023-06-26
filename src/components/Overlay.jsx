import React from 'react'
import Animation from './Animation'
import Menu from './Menu'
import Stats from './Stats'

export default function Overlay() {
  return (
    <div id='overlay'>
      <div id='top-container'>
        <Menu />
        <Stats />
      </div>
      <Animation />
    </div>
  )
}
