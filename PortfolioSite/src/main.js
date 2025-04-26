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
const startCameraPos = new THREE.Vector3(0, 5, 30)
const startCameraRot = new THREE.Euler(Math.PI, Math.PI, Math.PI)
camera.position.copy(startCameraPos)
camera.rotation.copy(startCameraRot)

//------------------------TEXTURE BACKGROUND-----------------------
const loader = new THREE.TextureLoader();
const spaceTexture = loader.load(
  'src/images/gradient.png',
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
const ambientLight = new THREE.AmbientLight(0x404040, 25); // soft white light
scene.add(ambientLight);
let pl1 = new THREE.PointLight(0x404040, 100)
pl1.position.copy(new THREE.Vector3(24, -1, 10))
scene.add(pl1)
//const pointLightHelper = new THREE.PointLightHelper(pl1, 1); // 1 is the size of the sphere
//scene.add(pointLightHelper);
//Camera movemenet 
let targetPosition = new THREE.Vector3()
let targetRotation = new THREE.Euler()
let transitioning = false

function getSectionOffsets() {
  const sections = document.querySelectorAll('section')
  return Array.from(sections).map(section => {
    return {id: section.id, offset: section.offsetTop}
  })
}
function moveCameraToPosition(position, rotation){
  targetPosition.copy(position)
  targetRotation.copy(rotation)
  transitioning = true
}
function onScroll() {
  const offsets = getSectionOffsets();
  const topOffset = 300
  if (window.scrollY>offsets.find(section => section.id==='skills').offset-topOffset) {
    moveCameraToPosition(new THREE.Vector3(30, .5, 25), new THREE.Euler(-0.07, 1.6, 0.15));
  }
  else if (window.scrollY>offsets.find(section => section.id==='education').offset - topOffset) {
    moveCameraToPosition(new THREE.Vector3(-2, 1.10, 21), new THREE.Euler(-0.07, 0.99, 0.06));
  }
  else {
    moveCameraToPosition(startCameraPos, startCameraRot)
  }
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

  
  if (transitioning) {
    // Position LERP
    camera.position.lerp(targetPosition, 0.03); // 0.05 is the lerp speed

    // Rotation LERP
    camera.rotation.x += (targetRotation.x - camera.rotation.x) * 0.05;
    camera.rotation.y += (targetRotation.y - camera.rotation.y) * 0.05;
    camera.rotation.z += (targetRotation.z - camera.rotation.z) * 0.05;

    // Stop if close enough
    if (camera.position.distanceTo(targetPosition) < 0.01) {
      camera.position.copy(targetPosition);
      camera.rotation.copy(targetRotation);
      transitioning = false;
    }
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();


