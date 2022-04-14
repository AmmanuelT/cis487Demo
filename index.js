const textureLoader = new THREE.TextureLoader();

//const normalTexture = textureLoader.load('/NormalMap.png')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const demo = document.getElementById("demo");

const renderer = new THREE.WebGLRenderer({
    canvas: demo, alpha: true
}
);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

const white = new THREE.Color( 0xffffff );
const black = new THREE.Color( 0x000000 );
const red = new THREE.Color( 0xff0000 );
const green = new THREE.Color( 0x00ff00 );
const blue = new THREE.Color( 0x0000ff );
const yellow = new THREE.Color( 0xffff00 );
const orange = new THREE.Color( 0xfe9815)

const color = [white,black,red,green,blue,yellow];
function toRad(angle){
    return angle*Math.PI /180
}
/*
function coloredSquare(x,y,z,rotX,rotY,color){
    const pl = new THREE.PlaneGeometry(1,1)
    const material = new THREE.MeshStandardMaterial()
    const square = new THREE.Mesh( pl, material);
    square.translateX(x)
    square.translateY(y)
    square.translateZ(z)
    square.rotateX(toRad(rotX))
    square.rotateX(toRad(rotY))

    square.material.color.set(color)

    scene.add(square);

    return square
}
*/

function subcube(x,y,z){
    const pl = new THREE.BoxGeometry()
    const material = new THREE.MeshStandardMaterial()
    const cube = new THREE.Mesh( pl, material);
    cube.translateX(x)
    cube.translateY(y)
    cube.translateZ(z)
  
    /*
const cube = new THREE.Group();
const front = coloredSquare(x, y, z+0.5, 0 , 0, (z == 1)? white : black);
const back = coloredSquare(x, y, z-0.5, 0 , 0, (z == -1)? blue : black);
const left = coloredSquare(x+0.5, y, z, 0 , 1.6 , (x == 1)? orange : black);
const right = coloredSquare(x-0.5, y, z, 0 , toRad(-180), (x == -1)? red : black);
const top = coloredSquare(x, y+0.5, z, toRad(90) , 0 , (y == 1)? green : black);
const bottom = coloredSquare(x, y-0.5, z, toRad(90) , 0, (y == -1)? yellow : black);

cube.add(front)
cube.add(back)
//cube.add(left)
cube.add(right)
cube.add(top)
cube.add(bottom)
*/
scene.add(cube);

return cube
}

// let cube = subcube(0,1,0)
//let s = subcube(1,1,1)

//const d = cube.matrix
//console.log(d)
const c = new Array(27);
let h = 0;
for (let i = 0; i < 3; i++){
    for (let j = 0 ; j < 3; j++){
        for (let k = 0; k < 3; k++){
            c[h] = subcube(i-1,j-1,k-1);
            h++; 
        }
    }
}

const pointLight2 = new THREE.PointLight(0xffffff, 1)
pointLight2.position.x = 2
pointLight2.position.y = 3
pointLight2.position.z = 4
scene.add(pointLight2)

const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.rotation.x = -45/180*Math.PI;
camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 5;

document.addEventListener('mousemove', onDocumentMouseMove)
document.addEventListener('wheel', onDocumentMouseScroll)

let mouseX = 0;
let mouseY = 0;
let zoom = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight/ 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)

}

function onDocumentMouseScroll(event){
    zoom += event.deltaY

}

let f = 0;
function animate() {
	
    //targetX = mouseX * 0.001;
    //targetY = mouseY * 0.001;
    //targetZ = zoom * 0.002;

    
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
    
    if (f<90){
        for (let i = 0; i < 3; i++){
                    let a = new THREE.Vector3(0,0,1)
                    c[i].setRotationFromAxisAngle(a,toRad(f))        
        }
        
    }
    
    
    f++;
    
    

    

}
animate();

