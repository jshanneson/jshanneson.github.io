import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//initialize camera & scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

camera.position.set(4,5,11);
camera.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('container3D'),
});
renderer.outputColorSpace = THREE.SRGBColorSpace;

//renderer specifications
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );

//make a plane for our mesh to sit on
const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
Scene.add(groundMesh);

//initialize a light
const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotLight.position.set(0,25,0);
scene.add(spotLight);

//add timesteps to the animation render
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  renderer.setAnimationLoop( animate )

}
animate();

