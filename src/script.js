import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// SCENE
const scene = new THREE.Scene();
// CANVAS
const canvas = document.querySelector("canvas.webgl");

// GEOMETRY

//Box - orange
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "orange" });
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.set(0.2, 0.2, 0.2);
scene.add(mesh);

//Box - blue
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({ color: "blue" });
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.scale.set(0.2, 0.2, 0.2);
scene.add(mesh2);

//Capsule - white , wireframe
const capsuleObj = new THREE.CapsuleGeometry(1, 1, 4, 8);
const materialCapsule = new THREE.MeshBasicMaterial({
  color: "white",
  wireframe: true,
});
const capsule = new THREE.Mesh(capsuleObj, materialCapsule);
scene.add(capsule);

//Torus Geometry
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshBasicMaterial({ color: "grey " });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

scene.add(torus);

//SIZE
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//RESIZE
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera: aspect ratio, projection matrix
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.getPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

//CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

//CONTROLS
const controls = new OrbitControls(camera, canvas);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

//ANIMATION
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  mesh.position.y = Math.cos(elapsedTime);
  mesh.position.x = Math.sin(elapsedTime);

  mesh2.position.y = Math.sin(elapsedTime);

  capsule.rotation.y = elapsedTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
