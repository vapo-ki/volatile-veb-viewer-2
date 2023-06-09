import './Viewer.css'
import { useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import ViewerInit from './ViewerInit';
import { importObj } from './Loader';

function Viewer() {
    useEffect (() => {
      const loader = new OBJLoader();
      const Viewer = new ViewerInit('canvas');
      Viewer.initialize();
      Viewer.animate();
        
      //Example Geometry
      //const boxGeometry = new THREE.BoxGeometry(16,16,16);
      //const boxMaterial = new THREE.MeshNormalMaterial();
      //const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //Viewer.scene.add(boxMesh);

      importObj(Viewer.scene);

    }, []);

  return (
  <div className='viewer'>
    <canvas id='canvas'></canvas>
  </div>
  )
}

export default Viewer
