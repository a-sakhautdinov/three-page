class Hero {

    current = new THREE.Group();

    constructor() {
        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3( -10,  0, 0 ),
            new THREE.Vector3(10, 0, 0 ),
            new THREE.Vector3( 0, 5, -20 ),
            new THREE.Vector3( -10, -5, 0 ),
            new THREE.Vector3( 10, -5, 0 ),
            new THREE.Vector3( 0, -2, 10 ),
        );
        
        geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geometry.faces.push( new THREE.Face3( 0, 3, 4 ) );
        geometry.faces.push( new THREE.Face3( 1, 3, 4 ) );
        geometry.faces.push( new THREE.Face3( 1, 0, 5 ) );

        const heroBody = new THREE.Mesh(geometry, whiteMat);
        heroBody.receiveShadow = false;
        heroBody.name = 'body';

        var geometryHead = new THREE.Geometry();

        geometryHead.vertices.push(
            new THREE.Vector3( -10,  1, 0 ),
            new THREE.Vector3(10, 1, 0 ),
            new THREE.Vector3( 0, 3, -20 ),
        );
        
        geometryHead.faces.push( new THREE.Face3( 0, 1, 2 ) );

        const heroHead = new THREE.Mesh(geometryHead, whiteMat);

        this.current.position.y =  5;
        this.current.position.z = 130;
    
        this.current.add(heroBody);
        this.current.add(heroHead);
    }
}