import * as THREE from 'three'
import RoomExperience from '.';
import DebugUI from '../utils/DebugUI';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export default class World {
    experience: RoomExperience;
    loadedResource: any;
    debugUI: DebugUI;
    orbitControls!: OrbitControls;

    constructor(experience: RoomExperience) {
        // Initialize
        this.experience = experience
        this.loadedResource = experience.resourcesLoader?.items
        this.debugUI = experience.debugUI;

        this.setUp3dRoom();

    }

    initiateOrbitControls() {
        this.orbitControls = new OrbitControls(this.experience.camera.cameraInstance, this.experience.canvas);

        this.orbitControls.enableDamping = true;
    }

    setUp3dRoom() {
        this.experience.resourcesLoader.on("3dRoomModelReady", () => {
            const sunLight = new THREE.DirectionalLight("white", 3);
            const material = new THREE.MeshBasicMaterial({ color: 'grey' });
            // this.loadedResource['3dRoomModel'].scene.traverse((child: any) => {
            //     child.material = material
            // })
            this.experience.scene.add(this.loadedResource['3dRoomModel'].scene, sunLight)
            this.initiateOrbitControls();
        })
    }


    update = () => {
        // update on each tick
        if (this.orbitControls) this.orbitControls.update()
    }

    destroy = () => {
    }
}