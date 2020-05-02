function createFloor() {
    const { scene } = screenSettings;

    floorGrass = new THREE.Mesh(new THREE.BoxGeometry(100, 1000, 2000), blackMat);
    floorGrass.receiveShadow = false;

    floor = new THREE.Group();
    floor.position.y = -500;

    floor.add(floorGrass);
    scene.add(floor);
}