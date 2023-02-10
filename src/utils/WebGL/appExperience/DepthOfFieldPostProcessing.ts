import * as THREE from 'three'
import AppExperience from ".";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
import DebugUI from '../utils/DebugUI';
import Sizes from '../utils/Sizes';

export default class DepthOfFieldPostProcessing {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private sizes: Sizes;
    private debugUI: DebugUI;
    private bokehPass!: BokehPass;
    private renderPass!: RenderPass;
    private gammaCorrectionPass!: ShaderPass;
    private effectComposer!: EffectComposer
    constructor(experience: AppExperience) {
        this.scene = experience.scene;
        this.camera = experience.camera.cameraInstance;
        this.sizes = experience.sizes;
        this.renderer = experience.renderer.rendererInstance;
        this.debugUI = experience.debugUI;
    }

    init() {
        // effect composer
        this.effectComposer = new EffectComposer(this.renderer);

        // Passes
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);

        this.bokehPass = new BokehPass(this.scene, this.camera, {
            focus: 0.78,
            aperture: 0.00184,
            maxblur: 0.01
        });

        this.effectComposer.addPass(this.renderPass);
        this.effectComposer.addPass(this.gammaCorrectionPass);
        this.effectComposer.addPass(this.bokehPass);



        this.renderer.autoClear = false;
        // this.addDebugUI();
    }

    togglePassesState(value: boolean) {
        this.renderPass.enabled = value;
        this.bokehPass.enabled = value;
        this.gammaCorrectionPass.enabled = value;
    }

    update() {
        this.effectComposer.render(0.1);

    }

    resize() {
        this.effectComposer.setSize(this.sizes.width, this.sizes.height);
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
    }

    private addDebugUI() {
        if (this.debugUI.isActive) {
            const dof = this.debugUI.ui.addFolder({
                title: "Depth Of Field",
                expanded: true
            })

            const PARAMS = {
                focus: (this.bokehPass.uniforms as any)['focus'].value,
                aperture: (this.bokehPass.uniforms as any)['aperture'].value,
                maxBlur: (this.bokehPass.uniforms as any)['maxblur'].value,
            }

            dof.addInput(PARAMS, "focus").on("change", () => {
                (this.bokehPass.uniforms as any)['focus'].value = PARAMS.focus;
            })
            dof.addInput(PARAMS, "aperture",).on("change", () => {
                const value = PARAMS.aperture * 0.01;
                (this.bokehPass.uniforms as any)['aperture'].value = value;
                console.log(value)
            })
            dof.addInput(PARAMS, "maxBlur", { step: 0.000001, min: 0.0, max: 0.5 }).on("change", () => {
                (this.bokehPass.uniforms as any)['maxblur'].value = PARAMS.maxBlur;
            })
        }
    }





}