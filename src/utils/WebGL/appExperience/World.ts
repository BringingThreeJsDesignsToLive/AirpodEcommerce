import * as THREE from 'three'
import AppExperience from '.';
import DebugUI from '../utils/DebugUI';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ResourcesLoader from '../utils/ResourcesLoader';
import { sourcesDefaultNames } from './sources';
import Airpods from './Airpods';
import TransparentBackground from './TransparentBackground';


export default class World {
    private experience: AppExperience;
    private resourceLoader: ResourcesLoader;
    private loadedResource: Record<sourcesDefaultNames, any>;
    private scene: THREE.Scene;
    private debugUI: DebugUI;
    gsapAnimation!: Animation;
    orbitControls!: OrbitControls;
    airpods: Airpods;
    transparentBackground: TransparentBackground;
    sunlight!: THREE.DirectionalLight

    constructor(experience: AppExperience) {
        // Initialize
        this.experience = experience;
        this.scene = experience.scene;
        this.resourceLoader = experience.resourcesLoader;
        this.loadedResource = experience.resourcesLoader?.items as Record<sourcesDefaultNames, any>
        this.debugUI = experience.debugUI;

        this.transparentBackground = new TransparentBackground(experience);
        this.airpods = new Airpods(experience);

        this.init();
        this.transparentBackground.init();
        this.airpods.init();
    }

    init() {
        this.setUpLight();

        this.experience.renderer.rendererInstance.outputEncoding = THREE.sRGBEncoding;
        // this.experience.renderer.rendererInstance.shadowMap.enabled = true;
        this.experience.renderer.rendererInstance.setClearColor(0x000000, 0);

        this.addDebugUi();
        // this.initiateOrbitControls();
    }

    setUpLight() {
        const ambientLight = new THREE.AmbientLight(new THREE.Color("#ffffff"), 0.5);

        this.sunlight = new THREE.DirectionalLight(new THREE.Color("#ffffff"), 1);
        this.sunlight.position.set(0, 0, 7);
        this.sunlight.castShadow = true

        this.experience.camera.cameraInstance.add(this.sunlight);
        this.scene.add(ambientLight);
    }

    addDebugUi() {
        if (this.debugUI.isActive) {
            const airpodFolder = this.debugUI.ui.addFolder({
                title: "World",
                expanded: true
            })

            const PARAMS = {
                sunlightPosition: {
                    x: this.sunlight.position.x,
                    y: this.sunlight.position.y,
                    z: this.sunlight.position.z
                }
            }

            airpodFolder.addInput(PARAMS, 'sunlightPosition').on('change', () => {
                const { x, y, z } = PARAMS.sunlightPosition
                this.sunlight.position.set(x, y, z)
            })
        }

    }

    initiateOrbitControls() {
        this.orbitControls = new OrbitControls(this.experience.camera.cameraInstance, this.experience.canvas);

        this.orbitControls.enableDamping = true;

    }


    update = () => {
        // update on each tick
        this.airpods.update()
        if (this.orbitControls) this.orbitControls.update()
    }

    destroy = () => {
    }
}