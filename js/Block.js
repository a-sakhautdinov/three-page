class Block {
    current = new THREE.Group();

    constructor() {
        var geometry = new THREE.SphereGeometry( 5, 64, 64 );
        const body = new THREE.Mesh(geometry, brownMat);

        this.current.position.y =  5;
        this.current.position.z = -600;
        this.current.position.x = 0;

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