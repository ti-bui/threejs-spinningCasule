import * as THREE from "three";

// SCENE
const scene = new THREE.Scene();
// CANVAS
const canvas = document.querySelector("canvas.webgl");

// GEOMETRY
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//SIZE
const sizes = {
  width: 800,
  height: 600,
};

//CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//ANIMATION
