// Kevin Liew 
// reference: three.js official documentation

// set the scene and camera in a perspective view
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x181818)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// put the whole scene into a canvas from html
const demo = document.getElementById("demo");
const renderer = new THREE.WebGLRenderer({
    canvas: demo, alpha: true, antialias: true,
} 
);
renderer.setSize( window.innerWidth, window.innerHeight );
// enable shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// the ground of the scene
function ground(){
    const pl = new THREE.BoxGeometry(20, 1, 20);
    const material = new THREE.MeshStandardMaterial({color: 0x9b7653 })
    const cube = new THREE.Mesh( pl, material);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = -2;
    cube.rotation.y = 0.8;
    cube.castShadow = true;
    cube.receiveShadow = true;

    cube.userData.name = 'ground';
    scene.add(cube);
}

// directional lights
const dirLight = new THREE.DirectionalLight(0x649C88, 2);
dirLight.position.x = 25
dirLight.position.y = 50
dirLight.position.z = 15
dirLight.castShadow = true;
dirLight.shadow.bias = -0.001;
dirLight.shadow.mapSize.width = 3200;
dirLight.shadow.mapSize.height = 3200;
scene.add(dirLight)

const dirLight2 = new THREE.DirectionalLight(0x9C5B4C, 2)
dirLight2.position.x = -25
dirLight2.position.y = 60
dirLight2.position.z = -50
dirLight2.shadow.bias = -0.001;
dirLight2.shadow.mapSize.width = 3200;
dirLight2.shadow.mapSize.height = 3200;
scene.add(dirLight2)
// shows where the light source is to make it eay to position
// const lightHelper = new THREE.PointLightHelper( dirLight2, 10 );
// scene.add(lightHelper)

// set the camera controls (rotate, zoom, pan)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.y = 10;
camera.position.z = 20;
camera.lookAt(new THREE.Vector3(0, 0, 0));

// set the raycaster to detect mouse click on objects
const raycaster = new THREE.Raycaster();
const mouseClick = new THREE.Vector2();
const mouseDrag = new THREE.Vector2();
const mouseDrag2 = new THREE.Vector2();

// mixer is for animation and drag is for dragging the character
let mixer;
let drag = false;

// load the character model
// let loader = new THREE.GLTFLoader();
// loader.load('KnightCharacter.glb', function(gltf){
    
//     // enable shadow for the model 
//     gltf.scene.traverse(function (child) {
//         if (child.isMesh) {
//             child.castShadow = true;
//             child.receiveShadow = true;
//         }
//     });

//     let knight = gltf.scene;

//     knight.position.set(0, 0.5, 0);
//     knight.scale.set(0.75, 0.75, 0.75)

   

//     scene.add(gltf.scene);
//     scene.add(camera);

//     dirLight.target = knight;
//     scene.add(dirLight.target);
//     dirLight2.target = knight;
//     scene.add(dirLight2.target);

//     camera.add(dirLight);
//     renderer.render(scene, camera);

//     mixer = new THREE.AnimationMixer( knight );
//     const clips = gltf.animations;
//     console.log(clips);
//     clips.forEach( function ( clip ) {
// 	    mixer.clipAction( clip ).play();
//       mixer.clipAction( clip ).setLoop(THREE.LoopOnce);
//       mixer.clipAction( clip ).clampWhenFinished = true;
//     } );


//     animate();

// });

var clock = new THREE.Clock();

function animate() {
  if (mixer) {
    mixer.update(clock.getDelta());
  } 
	renderer.render( scene, camera );  
  requestAnimationFrame( animate );
  //console.log(camera.position)
}

localStorage.setItem("planet", "Mion");
const planet = localStorage.getItem("planet");
console.log(planet);


ground();
animate();

