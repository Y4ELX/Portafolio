import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x151924);
renderer.setPixelRatio(window.devicePixelRatio);


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Configurar la cámara perspectiva
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5);

// Luces en la escena
const spotLight = new THREE.SpotLight(0x51e153, 10000, 100, 0.5, 1);
spotLight.position.set(10, -30, -20);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.001;
scene.add(spotLight);

const spotLight1 = new THREE.SpotLight(0x51e153, 10000, 100, 0.5, 1);
spotLight1.position.set(-10, 30, 20);
spotLight1.castShadow = true;
spotLight1.shadow.bias = -0.001;
scene.add(spotLight1);

// Cargar el modelo 3D
const loader = new GLTFLoader().setPath('public/logo3d/');
loader.load('logoul.gltf', (gltf) => {
    console.log('loading model');
    const mesh = gltf.scene;

    mesh.traverse((child) => {
        if (child.isMesh) {
            const material = new THREE.MeshStandardMaterial({
                color: 0x00ff00,
                roughness: 0.8,
                metalness: 0.2
            });
            child.material = material; // Asignar material personalizado
        }
    });

    mesh.scale.set(2, 2, 2);
    mesh.position.set(0, -1.5, 0);

    // Ajustar la rotación del mesh
    mesh.rotation.y = Math.PI / 2; // Ajustar la rotación en el eje Y (90 grados)

    scene.add(mesh);

    document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
    console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
    console.error(error);
});


// Ajustar la cámara y el renderizador al redimensionar la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// Variables para rastrear el movimiento del mouse
let mouseX = 0, mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Evento de movimiento del mouse
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
});
// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Calcular la rotación de la cámara basada en la posición del mouse
    camera.position.x = mouseX * 2;
    camera.position.y = -mouseY * 1;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();
