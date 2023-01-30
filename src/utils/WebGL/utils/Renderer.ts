import DefaultExperience from "./DefaultExperience";
import Sizes from './Sizes';
import * as THREE from 'three'
import Camera from "./Camera";

export default class Renderer {
    public rendererInstance!: THREE.WebGLRenderer
    public experience: DefaultExperience;
    public canvas: HTMLCanvasElement;
    public scene: THREE.Scene;
    public camera: Camera;
    public sizes: Sizes

    constructor(experience: DefaultExperience) {
        // Initialize 
        this.experience = experience
        this.canvas = experience.canvas;
        this.scene = experience.scene;
        this.camera = experience.camera;
        this.sizes = experience.sizes;

        // create renderer Instance
        this.setRendererInstance()
    }

    private setRendererInstance() {
        this.rendererInstance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.rendererInstance.setSize(this.sizes.width, this.sizes.height);
        this.rendererInstance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        // Update Renderer on resize
        this.rendererInstance.setSize(this.sizes.width, this.sizes.height);
        this.rendererInstance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        // update renderer on each tick
        this.rendererInstance.render(this.scene, this.camera.cameraInstance)
    }

    destroy() {
        this.rendererInstance.dispose();
    }
}