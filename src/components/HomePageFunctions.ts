import * as THREE from "three";

export const setupObjects = ( scene: THREE.Scene, renderer: THREE.Renderer, camera: THREE.Camera ) => {
    let boxGeo = new THREE.BoxGeometry( 1, 1, 1);
    let boxMat = new THREE.MeshPhongMaterial({
        color: 0xaaff00,
    });
    let tempBox = new THREE.Mesh( boxGeo, boxMat );
    scene.add( tempBox );

    const animateBox = () => {
        requestAnimationFrame( animateBox );
        
        tempBox.rotation.x += 1;
        tempBox.rotation.y += 1;

        renderer.render( scene, camera );
    }

    animateBox();

}

export const setupLights = ( scene: THREE.Scene ) => {
    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set( -1, 2, 4 );
    scene.add( dirLight );

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0x232323, 1);
    scene.add( hemiLight );
}