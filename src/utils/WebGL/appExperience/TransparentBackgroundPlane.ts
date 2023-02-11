import * as THREE from 'three'
import AppExperience from ".";
import DebugUI from '../utils/DebugUI';
import Sizes from '../utils/Sizes';

export default class TransparentBackgroundPlane {
    private experience: AppExperience;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private debugUI: DebugUI;
    private sizes: Sizes;
    private transparentBackground!: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    private circlBackground!: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
    constructor(experience: AppExperience) {
        this.experience = experience;
        this.scene = experience.scene;
        this.camera = experience.camera.cameraInstance;
        this.debugUI = experience.debugUI;
        this.sizes = experience.sizes

    }

    init() {
        this.setUpTransparentPlane();
        this.addDebugUI();
    }

    private setUpTransparentPlane() {

        // calculate the plane size using the camera FOV so as to fill up the entire screen that wraps the canvas
        let ang_rad = this.camera.fov * Math.PI / 180;
        let fov_y = this.camera.position.z * Math.tan(ang_rad / 2) * 2;

        const geometry = new THREE.PlaneGeometry(fov_y * this.camera.aspect, fov_y);

        const material = new THREE.MeshBasicMaterial({})
        material.transparent = true;
        material.opacity = 0.5
        material.color = new THREE.Color("#ffffff")


        this.transparentBackground = new THREE.Mesh(geometry, material);

        this.transparentBackground.position.set(0, 0, -4)

        this.camera.add(this.transparentBackground);
    }


    private addDebugUI() {
        if (this.debugUI.isActive) {
            const transparentBackgroundFolder = this.debugUI.ui.addFolder({
                title: "transparentBackground",
                expanded: true
            })

            const PARAMS = {
                opacity: this.transparentBackground.material.opacity,
                color: this.transparentBackground.material.color
            }
            transparentBackgroundFolder.addInput(PARAMS, 'opacity').on('change', () => {
                this.transparentBackground.material.opacity = PARAMS.opacity
            })
            transparentBackgroundFolder.addInput(PARAMS, 'color').on('change', () => {
                console.log(PARAMS.color)
                this.transparentBackground.material.color = new THREE.Color(PARAMS.color)
            })
        }
    }
}