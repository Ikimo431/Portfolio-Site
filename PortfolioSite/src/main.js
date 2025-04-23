import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const modelLoader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

//-----CAMERA ORBIT CONTROLS 
const controls = new OrbitControls(camera, renderer.domElement);
console.log('OrbitControls created:', controls);


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//------------------------TEXTURE BACKGROUND-----------------------
const loader = new THREE.TextureLoader();
const spaceTexture = loader.load(
  'src/images/Background.jpg',
  () => console.log('Background loaded!'),
  undefined,
  err => console.error('Error loading texture:', err)
);
scene.background = spaceTexture
//--------------------LOAD MODEL-----------------------------------
var model1;
modelLoader.load('src/models/SceneTest.glb', (gltf) => {
  const model = gltf.scene
  scene.add(model)
  model1 = model;
  model.position.set(10, -4, 5)
  model.rotation.y = -Math.PI/3
}, undefined, (error)=> {
  console.error(error)
})
//-----LIGTHING------------
const ambientLight = new THREE.AmbientLight(0x404040, 20); // soft white light
scene.add(ambientLight);

//Camera movemenet 

function onScroll() {


}
document.body.onscroll = onScroll;
onScroll();

//camera debug 
const debugButton = document.getElementById('debug');
debugButton.addEventListener('click', () => {
  const pos = camera.position;
  const rot = camera.rotation;

  console.log(`Camera Position: x=${pos.x.toFixed(2)}, y=${pos.y.toFixed(2)}, z=${pos.z.toFixed(2)}`);
  console.log(`Camera Rotation: x=${rot.x.toFixed(2)}, y=${rot.y.toFixed(2)}, z=${rot.z.toFixed(2)}`);
});



function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
animate();


