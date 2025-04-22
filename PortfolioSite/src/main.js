import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const modelLoader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})




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
const ambientLight = new THREE.AmbientLight(0x404040, 40); // soft white light
scene.add(ambientLight);

//rotation
let prevScrollTop = window.scrollY;
function onScroll() {
  const currScrollTop = window.scrollY;
  if(model1){
    if (currScrollTop > prevScrollTop){
      model1.rotation.y -= 0.01;
    }
    else if (currScrollTop < prevScrollTop){
      model1.rotation.y -=0.01;
    }
  }
  prevScrollTop = currScrollTop;
}
document.body.onscroll = onScroll;
onScroll();





function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
