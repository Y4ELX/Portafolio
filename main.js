import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x151924, 0);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
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

let mesh; // Variable para almacenar la malla cargada

// Cargar el modelo 3D
const loader = new GLTFLoader().setPath('public/logo3d/');
loader.load('logoul.gltf', (gltf) => {
    console.log('loading model');
    mesh = gltf.scene;

    mesh.traverse((child) => {
        if (child.isMesh) {
            const material = new THREE.MeshStandardMaterial({
                color: 0x61CE7D,
                roughness: 0.8,
                metalness: 0.2
            });
            child.material = material; // Asignar material personalizado
        }
    });

    mesh.scale.set(2.5, 2.5, 2.5);
    mesh.position.set(0, -1.3, 0);

    // Ajustar la rotación del mesh
    mesh.rotation.y = Math.PI / -2; // Ajustar la rotación en el eje Y (90 grados)

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
const cursor = document.getElementById('cursor');
var dof = null;

// Detectar cuando el cursor sale del área del iframe
document.addEventListener('mouseleave', function () {
    dof = false;
    cursor.style.display = 'none'; // Ocultar el cursor cuando el cursor sale del área del iframe
});

// Detectar cuando el cursor entra en el área del iframe
document.addEventListener('mouseenter', function () {
    dof = true;
    cursor.style.display = 'block'; // Mostrar el cursor cuando el cursor entra en el área del iframe
});

var yaSalio = true;
let direction = 1; // 1 para subir, -1 para bajar

    setTimeout(function () {
        mesh.rotation.y = -1.6
    }, 2700);

    function animate() {
    requestAnimationFrame(animate);

    if (dof) {

        
        if (camera.position.y.toFixed(1) != (-mouseY * 1).toFixed(1) || camera.position.x.toFixed(1) != (mouseX * 2).toFixed(1) || mesh.rotation.y.toFixed(2) != -1.57){
            yaSalio = false;
            mesh.rotation.y += ((mesh.rotation.y < -1.57) ? 0.01 : 0);
            mesh.rotation.y -= ((mesh.rotation.y > -1.57) ? 0.01 : 0);

            camera.position.x += ((camera.position.x < mouseX * 3) ? 0.05 : 0);
            camera.position.x -= ((camera.position.x > mouseX * 3) ? 0.05 : 0);

            camera.position.y += ((camera.position.y < -mouseY * 1) ? 0.05 : 0);
            camera.position.y -= ((camera.position.y > -mouseY * 1) ? 0.05 : 0);

            console.log("IF");
            console.log((mouseX * 2).toFixed(1));
            console.log(camera.position.x.toFixed(1));
            console.log("-------------------------------")
            console.log((-mouseY * 1).toFixed(1));
            console.log(camera.position.y.toFixed(1));

            // En tu bucle o donde necesites el movimiento
            if (mesh.position.y < -1 && direction === 1) {
                mesh.position.y += 0.002; // o cualquier velocidad deseada
            } else if (mesh.position.y >= -1 && direction === 1) {
                direction = -1; // Cambiar la dirección una vez que alcanza el límite superior
            } else if (mesh.position.y > -1.3 && direction === -1) {
                mesh.position.y -= 0.002; // o cualquier velocidad deseada
            } else if (mesh.position.y <= -1.3 && direction === -1) {
                direction = 1; // Cambiar la dirección una vez que alcanza el límite inferior
            }
        }else{
            console.log("ELSE")
            console.log((mouseX * 2).toFixed(1));
            console.log(camera.position.x.toFixed(1));
            console.log("////////////////////////////////")
            console.log((-mouseY * 1).toFixed(1));
            console.log(camera.position.y.toFixed(1));

            // En tu bucle o donde necesites el movimiento
            if (mesh.position.y < -1 && direction === 1) {
                mesh.position.y += 0.002; // o cualquier velocidad deseada
            } else if (mesh.position.y >= -1 && direction === 1) {
                direction = -1; // Cambiar la dirección una vez que alcanza el límite superior
            } else if (mesh.position.y > -1.3 && direction === -1) {
                mesh.position.y -= 0.002; // o cualquier velocidad deseada
            } else if (mesh.position.y <= -1.3 && direction === -1) {
                direction = 1; // Cambiar la dirección una vez que alcanza el límite inferior
            }
            
            // Calcular la rotación de la cámara basada en la posición del mouse
            camera.position.x = mouseX * 2;
            camera.position.y = -mouseY * 1;
            setTimeout(function () {
                yaSalio = true;
            }, 1000000);
        }

        


        camera.lookAt(scene.position);

        console.log("Rotación actual del mesh:", mesh.rotation.x, mesh.rotation.y, mesh.rotation.z);
        console.log("Posición actual de la cámara:", camera.position.x, camera.position.y, camera.position.z);

        renderer.render(scene, camera);
    } else {

        // Restablecer la rotación del mesh a la orientación neutra
        camera.position.x += ((camera.position.x < 0) ? 0.01 : 0);
        camera.position.y += ((camera.position.y < 0) ? 0.01 : 0);

        // Restablecer la rotación del mesh a la orientación neutra
        camera.position.x -= ((camera.position.x > 0) ? 0.01 : 0);
        camera.position.y -= ((camera.position.y > 0) ? 0.01 : 0);


        camera.lookAt(scene.position);

        mesh.rotation.y += 0.008;
        

        // En tu bucle o donde necesites el movimiento
        if (mesh.position.y < -1 && direction === 1) {
            mesh.position.y += 0.002; // o cualquier velocidad deseada
        } else if (mesh.position.y >= -1 && direction === 1) {
            direction = -1; // Cambiar la dirección una vez que alcanza el límite superior
        } else if (mesh.position.y > -1.3 && direction === -1) {
            mesh.position.y -= 0.002; // o cualquier velocidad deseada
        } else if (mesh.position.y <= -1.3 && direction === -1) {
            direction = 1; // Cambiar la dirección una vez que alcanza el límite inferior
        }



        console.log("Rotación actual del mesh:", mesh.rotation.x, mesh.rotation.y, mesh.rotation.z);
        console.log("Posición actual de la cámara:", camera.position.x, camera.position.y, camera.position.z);

        renderer.render(scene, camera);
    }
}




animate();
