function createFloor() {
    const { scene } = screenSettings;
    floorShadow = new THREE.Mesh(new THREE.BoxGeometry(100, 1000, 2000), new THREE.MeshPhongMaterial({
        color: 0x0C0B36,
        specular: 0x000000,
        shininess: 1,
        transparent: true,
        opacity: .5
    }));
    floorShadow.receiveShadow = true;

    floorGrass = new THREE.Mesh(new THREE.BoxGeometry(100, 1000, 2000), new THREE.MeshBasicMaterial({
        color: 0x7abf8e
    }));
    floorGrass.receiveShadow = false;

    floor = new THREE.Group();
    floor.position.y = -500;

    floor.add(floorShadow);
    floor.add(floorGrass);
    scene.add(floor);
}