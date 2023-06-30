import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class ViewerInit {
  constructor(canvasId, isTab, isCosmo=false) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    this.isCosmo = isCosmo;
    this.canvasId = canvasId;
    this.isTab = isTab;
    this.stats = undefined;
    this.controls = undefined;
    this.gridHelper = undefined;

    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.mouseOnCanvas = false;

    this.clock = undefined;
    this.mixer = undefined;
  }

  initialize() {
    //Base
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)

    if (this.isTab) {
      this.camera = new THREE.PerspectiveCamera(25, 96 / 78, 0.001, 100);
    } else {
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.001,
        100
      );
    }

    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    if (this.isTab) {
      this.renderer.setSize(96, 78);
    } else {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    if (this.isTab) {
      if (this.isCosmo) {
        this.camera.position.z = 4;
        this.camera.position.y = 1;
      }
      this.camera.position.z = 6;
    this.camera.position.y = 1.5;
    } else {
      this.camera.position.z = 7;
    this.camera.position.y = 5;
    }

    
    document.body.appendChild(this.renderer.domElement);

    //Window Resize
    if (!this.isTab) {
      window.addEventListener("resize", () => this.onWindowResize(), false);
    }

    //Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.spotLight = new THREE.SpotLight(0xffffff, 1);
    this.spotLight.castShadow = true;
    this.spotLight.position.set(0, 64, 32);
    this.scene.add(this.spotLight);

    //Grid
    if (!this.isTab) {
      this.gridHelper = new THREE.GridHelper(20, 20);
      this.scene.add(this.gridHelper);
    }

    //Controls
    if (!this.isTab) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    this.clock = new THREE.Clock();
    this.mixer = new THREE.AnimationMixer();
  }

  animate() {
    if (!this.isTab) {
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    this.mixer.update(delta);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseEnter(event) {
    this.mouseOnCanvas = true;
  }

  onMouseExit(event) {
    this.mouseOnCanvas = false;
  }
}
