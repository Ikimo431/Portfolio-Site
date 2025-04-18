import './style.css'
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const loader = new THREE.TextureLoader();
const spaceTexture = loader.load(
  'src/images/Background.jpg',
  () => console.log('Background loaded!'),
  undefined,
  err => console.error('Error loading texture:', err)
);

scene.background = spaceTexture



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
