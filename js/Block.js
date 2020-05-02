class Block {
    current = new THREE.Group();

    constructor() {
        const body = new THREE.Mesh(new THREE.BoxGeometry(10, 15, 10), new THREE.MeshBasicMaterial({
            color: 0xff4d21,
        }));

        this.current.receiveShadow = false;
        this.current.position.y =  5;
        this.current.position.z = 50;
        this.current.position.x = 15;

        this.current.add(body);
    }

    animate() {
        if (this.current.position.z < 160) {
            this.current.position.z += BLOCKS_SPEED[currentGameMode];
        } else {
            const xPositions = [0, 30, -30];
            this.current.position.x = xPositions[Math.floor(Math.random() * 3)];
            this.current.position.z = Math.random() * (-800 + 300) - 300;
        }
    }
}