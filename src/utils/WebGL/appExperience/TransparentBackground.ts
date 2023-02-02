import * as THREE from 'three'
import AppExperience from ".";
import DebugUI from '../utils/DebugUI';

export default class TransparentBackground {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private debugUI: DebugUI;
    private transparentBackground!: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    constructor(experience: AppExperience) {
        this.scene = experience.scene;
        this.camera = experience.camera.cameraInstance;
        this.debugUI = experience.debugUI;
    }


    init() {
        // calculate the plane size using the camera FOV so as to fill up the entire screen
        let ang_rad = this.camera.fov * Math.PI / 180;
        let fov_y = this.camera.position.z * Math.tan(ang_rad / 2) * 2;

        const geometry = new THREE.PlaneGeometry(fov_y * this.camera.aspect, fov_y);
        // const material = new THREE.MeshPhongMaterial({ color: "#ffffff", refractionRatio: 0.98, reflectivity: 0.9 });
        // material.transmission = 1;
        // material.metalness = 0;
        // material.thickness = 0;
        // material.roughness = 0;

        const material = new THREE.MeshBasicMaterial({})
        material.transparent = true;
        material.opacity = 0.90
        material.color = new THREE.Color("#ffffff")


        this.transparentBackground = new THREE.Mesh(geometry, material);

        this.transparentBackground.position.set(0, 0, -4)

        this.camera.add(this.transparentBackground);
        this.addDebugUI();
    }

    private addDebugUI() {
        if (this.debugUI.isActive) {
            const transparentBackgroundFolder = this.debugUI.ui.addFolder({
                title: "transparentBackground",
                expanded: true
            })

            const PARAMS = {
                // thickness: this.transparentBackground.material.thickness,
                // transmission: this.transparentBackground.material.transmission,
                // roughness: this.transparentBackground.material.roughness,
                // metalness: this.transparentBackground.material.metalness,
                opacity: this.transparentBackground.material.opacity,
                color: this.transparentBackground.material.color
            }

            // transparentBackgroundFolder.addInput(PARAMS, 'thickness').on('change', () => {
            //     this.transparentBackground.material.thickness = PARAMS.thickness
            // })
            // transparentBackgroundFolder.addInput(PARAMS, 'transmission').on('change', () => {
            //     this.transparentBackground.material.transmission = PARAMS.transmission
            // })
            // transparentBackgroundFolder.addInput(PARAMS, 'roughness').on('change', () => {
            //     this.transparentBackground.material.roughness = PARAMS.roughness
            // })
            // transparentBackgroundFolder.addInput(PARAMS, 'metalness').on('change', () => {
            //     this.transparentBackground.material.metalness = PARAMS.metalness
            // })
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