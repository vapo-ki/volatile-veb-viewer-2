import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

export function importObj(scene) {
    const mtlLoader = new MTLLoader();
    const path = './models/skull/'

    mtlLoader.setPath(path)
    mtlLoader.load('Skull.mtl', function (materials) {
        materials.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(path);
        objLoader.load('Skull.obj', function (object) {
            scene.add(object);
            object.rotation.x += 5;
            console.log(object);
        })
    })
    
}
