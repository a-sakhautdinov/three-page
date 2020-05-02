class Hero {

    current = new THREE.Group();

    constructor() {
        const heroBody = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({
            color: 0x5f9042
        }));
        heroBody.receiveShadow = false;
        heroBody.name = 'body';
    
        const heroLeftHand = new THREE.Mesh(new THREE.BoxGeometry(2, 5, 2), new THREE.MeshBasicMaterial({
            color: 0x5f9042
        }));
        heroLeftHand.receiveShadow = false;
        heroLeftHand.position.x = -6;
        
        const heroRightHand = new THREE.Mesh(new THREE.BoxGeometry(2, 5, 2), new THREE.MeshBasicMaterial({
            color: 0x5f9042
        }));
        heroRightHand.receiveShadow = false;
        heroRightHand.position.x = 6;
    
        const heroHead = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({
            color: 0x5f9042
        }));
        heroHead.receiveShadow = false;
        heroHead.position.y = 8;

        this.current.position.y =  5;
        this.current.position.z = 130;
    
        this.current.add(heroBody);
        this.current.add(heroLeftHand);
        this.current.add(heroRightHand);
        this.current.add(heroHead);
    }
}