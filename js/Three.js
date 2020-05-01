class Three {
    current = new THREE.Group();

    constructor() {
        const threeBody = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({
            color: 0x7abf8e
        }));

        this.current.receiveShadow = false;
        this.current.position.y =  5;
        this.current.position.z = 50;
        this.current.position.x = 15;

        this.current.add(threeBody);
        scene.add(this.current );
    }

    animate() {
        if (this.current.position.z < 160) {
            this.current.position.z +=3;
        } else {
            const xPositions = [0, 30, -30];
            this.current.position.x = xPositions[Math.floor(Math.random() * 3)];
            this.current.position.z = Math.random() * 600 - 600;
        }
    }
}