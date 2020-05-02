class ScreenSettings {
    scene;
    camera;
    renderer;

    constructor() {
        // create scene with fog
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x2e2b26, 200, 900);

        // create camera
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_SETTINGS[currentState].FOV,
            CAMERA_SETTINGS[currentState].ASPECT_RATIO,
            CAMERA_SETTINGS[currentState].NEAR_PLANE,
            CAMERA_SETTINGS[currentState].FAR_PLANE,
        );
        this.changeCameraState(INITIAL_STATE);
        // init renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(malusClearColor, malusClearAlpha);
    
        this.renderer.setSize(WIDTH, HEIGHT);
        this.renderer.shadowMap.enabled = true;
    
        const container = document.getElementById('world');
        container.appendChild(this.renderer.domElement);
    }

    changeCameraState(currentState) {
        this.camera.position.x = CAMERA_SETTINGS[currentState].POS_X;
        this.camera.position.y = CAMERA_SETTINGS[currentState].POS_Y;
        this.camera.position.z = CAMERA_SETTINGS[currentState].POS_Z;
        this.camera.lookAt(CAMERA_SETTINGS[currentState].LOOT_AT);
    }
}