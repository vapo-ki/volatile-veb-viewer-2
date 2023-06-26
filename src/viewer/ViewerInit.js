import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export default class ViewerInit {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    this.canvasId = canvasId;
    this.stats = undefined;
    this.controls = undefined;

    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.mouseOnCanvas = false;

    this.clock = undefined;
    this.mixer = undefined;
  }

  initialize() {
    //Base
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.001,
      100
    );
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 7;
    this.camera.position.y = 5;
    document.body.appendChild(this.renderer.domElement);

    //Window Resize
    window.addEventListener("resize", () => this.onWindowResize(), false);

    //Lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.spotLight = new THREE.SpotLight(0xffffff, 1);
    this.spotLight.castShadow = true;
    this.spotLight.position.set(0, 64, 32);
    this.scene.add(this.spotLight);

    //Grid
    const gridHelper = new THREE.GridHelper(20, 20);
    this.scene.add(gridHelper);
    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.mixer = new THREE.AnimationMixer()

    //FPS
    //this.stats = Stats();
    //document.body.appendChild(this.stats.dom);

    /* this.renderer.domElement.addEventListener(
      "pointermove",
      this.onMouseEnter,
      false
    );
    this.renderer.domElement.addEventListener(
      "pointerleave",
      this.onMouseExit,
      false
    ); */
  }

  animate() {
    //this.stats.update();
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
		this.mixer.update( delta );
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
