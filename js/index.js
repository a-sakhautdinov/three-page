var screenSettings;

var hero = new Hero();
var threes = [];
var pointsInterval;
var points = 0;
var health = 100;

function setCurrentMod(mode) {
    var fieldDistance = document.getElementById("distValue");
    fieldDistance.innerText = 0;
    currentGameMode = mode;
    switch(currentGameMode) {
        case DEFAULT_MODE:
            trainingMode.classList.add("button-selected");
            easyMode.classList.remove("button-selected");
            hardMode.classList.remove("button-selected");
            break;
        case EASY_MODE:
            trainingMode.classList.remove("button-selected");
            easyMode.classList.add("button-selected");
            hardMode.classList.remove("button-selected");
            break;
        case HARD_MODE:
            trainingMode.classList.remove("button-selected");
            easyMode.classList.remove("button-selected");
            hardMode.classList.add("button-selected");
            break;
        default: 
            null;
    }
}

function initScreenSettings() {
    screenSettings = new ScreenSettings();
}

function showCurrentModeButton(state) {
    var fieldDistance = document.getElementById("distValue");
    if (state === GAME_STATE) {
        fieldDistance.innerText = "000";
        switch(currentGameMode) {
            case DEFAULT_MODE:
                trainingMode.style.display = 'block';
                easyMode.style.display = 'none';
                hardMode.style.display = 'none';
                break;
            case EASY_MODE:
                trainingMode.style.display = 'none';
                easyMode.style.display = 'block';
                hardMode.style.display = 'none';
                break;
            case HARD_MODE:
                trainingMode.style.display = 'none';
                easyMode.style.display = 'none';
                hardMode.style.display = 'block';
                break;
            default: 
                null;
        }
    } else if (state === INITIAL_STATE) {
        trainingMode.style.display = 'block';
        easyMode.style.display = 'block';
        hardMode.style.display = 'block';
    }
}

function initUI() {
    var fieldDistance = document.getElementById("distValue");
    var startButton = document.getElementById("startButton");
    var endButton = document.getElementById("endButton");
    var trainingMode = document.getElementById("trainingMode");
    var easyMode = document.getElementById("easyMode");
    var hardMode = document.getElementById("hardMode");
    var healthBar = document.getElementById("healthBar");
    var gameOver = document.getElementById("gameOver");

    startButton.addEventListener("click", (e) => {
        currentState = GAME_STATE;
        screenSettings.changeCameraState(GAME_STATE);
        showCurrentModeButton(GAME_STATE);
        health = 100;
        points = 0;
        healthBar.style.width = health-- + "%";
        createHero();
        pointsInterval = setInterval(() => fieldDistance.innerText = (points++).toString().padStart(3, "0"), 1000);
    });

    endButton.addEventListener("click", () => {
        currentState = INITIAL_STATE;
        screenSettings.changeCameraState(INITIAL_STATE);
        showCurrentModeButton(INITIAL_STATE);
        removeHero();
        gameOver.innerHTML = null;
        clearInterval(pointsInterval);
    });

    trainingMode.addEventListener("click", () => {
        if (currentState !== GAME_STATE) {
            setCurrentMod(DEFAULT_MODE);
        }
    });

    easyMode.addEventListener("click", () => {
        if (currentState !== GAME_STATE) {
            setCurrentMod(EASY_MODE);
        }
    });

    hardMode.addEventListener("click", () => {
        if (currentState !== GAME_STATE) {
            setCurrentMod(HARD_MODE);
        }
    });
}

var hitted = false;

function handleHit() {
    var healthBar = document.getElementById("healthBar");
    var gameOver = document.getElementById("gameOver");
    healthBar.style.width = health-- + "%";
    if (health <= 0) {
        currentState = INITIAL_STATE;
        screenSettings.changeCameraState(INITIAL_STATE);
        showCurrentModeButton(INITIAL_STATE);
        removeHero();
        gameOver.innerHTML =`<div>Game over </br> You score: ${points * 2.5}</div>`;
        if (pointsInterval) {
            clearInterval(pointsInterval);
        }
    }
}

function debounce(func, interval) {
    var lastCall = -1;
    return function () {
        clearTimeout(lastCall);
        var args = arguments;
        lastCall = setTimeout(function () {
            func.apply(this, args);
        }, interval);
    };
}

function checkCollision() {
    const { scene } = screenSettings;
    var originPoint = hero.current.position.clone();

    var cube = hero.current.children.find((element) => element.name === 'body');

    for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++) {
        var localVertex = cube.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4(cube.matrix);
        var directionVector = globalVertex.sub(cube.position);

        var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
        var collisionResults = ray.intersectObjects(threes.map((three) => three.current.children[0]));
        if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
            var currentBlock = scene.children.find((child) => child.id === collisionResults[0].object.id - 1);
            currentBlock.position.z = Math.random() * (-800 + 300) - 300;
            debounce(handleHit(), 1000);
            // scene.remove(scene.children.find((child) => child.id === collisionResults[0].object.id - 1));
        }
    }
}

function animate() {
    const { scene, camera, renderer } = screenSettings;
    requestAnimationFrame( animate );
    currentState === GAME_STATE && checkCollision();
    threes.forEach((three) => three.animate());
    renderer.render(scene, camera);
}

// needs work
function createLights() {
    const { scene } = screenSettings;

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

// movements
function handleMoves(e) {
    if (e.key === "a" && hero.current.position.x !== -30) {
        hero.current.translateX(-30);
    }
    if (e.key === "d" && hero.current.position.x !== 30) {
        hero.current.translateX(30);
    }
}

function createHero() {
    const { scene } = screenSettings;
    scene.add(hero.current);
    window.addEventListener("keypress", handleMoves);
}

function removeHero() {
    const { scene } = screenSettings;
    scene.remove(hero.current);
    window.removeEventListener("keypress", handleMoves);
}

function createBlocks() {
    const { scene } = screenSettings;
    [...Array(5)].forEach(() => threes.push(new Block()));
    threes.forEach((three) => scene.add(three.current));
}

function init(event) {
    initScreenSettings();
    createLights();
    createFloor();
    createBlocks();
    initUI();
    animate();
}

window.addEventListener('load', init, false);
