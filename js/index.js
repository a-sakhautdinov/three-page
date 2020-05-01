

var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    gobalLight, shadowLight, backLight,
    renderer,
    container;

var delta = 0;
var floorRadius = 200;
var cameraPosGame = 200;
var cameraPosGameOver = 260;
var monsterAcceleration = 0.004;
var malusClearColor = 0xb44b39;
var malusClearAlpha = 0;

var fieldGameOver, fieldDistance;


var threes = [];

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function initScreenAnd3D() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;

    scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0xC0BFDA, 200, 600);

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 50;
    nearPlane = 1;
    farPlane = 2000;

    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    camera.position.x = 0;
    camera.position.z = cameraPosGame;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0, 30, 0));

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(malusClearColor, malusClearAlpha);

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}

function initUI() {
    fieldDistance = document.getElementById("distValue");
    fieldGameOver = document.getElementById("gameoverInstructions");

    let value = 0;
    setInterval(() => fieldDistance.innerText = value++, 1000);
}

window.addEventListener('load', init, false);

function animate() {
    requestAnimationFrame( animate );
    threes.forEach((three) => three.animate());
    renderer.render(scene, camera);
}


function createLights() {
    globalLight = new THREE.AmbientLight(0xffffff, .9);

    shadowLight = new THREE.DirectionalLight(0xffffff, 1);
    shadowLight.position.set(-30, 40, 20);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 2000;
    shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

    scene.add(globalLight);
    scene.add(shadowLight);
}


function init(event) {
    initScreenAnd3D();
    createLights();
    createFloor();

    const hero = new Hero();
    hero.handleMoves();
    scene.add(hero.current);
    [...Array(5)].forEach(() => threes.push(new Three()));
    scene.add(hero.current);
    
    initUI();
    animate();
}