import * as THREE from 'three';
import Animation from '../../gsapAnimations';
import DefaultExperience from '../utils/DefaultExperience';
import { Camera3dSpace, DefaultExperienceOptions } from '../utils/types';
import World from './World';

const camera3dSpace: Camera3dSpace = {
    position: new THREE.Vector3(3.74, 1, -4.73),
    scale: new THREE.Vector3(1, 1, 1),
    rotation: new THREE.Vector3(0, 0, 0),
    fov: 75
}

const defaultExperienceOptions: DefaultExperienceOptions = {
    useWindowSizeOnResize: false,

}

export default class AppExperience extends DefaultExperience {
    private static _instance: AppExperience | null;
    world!: World;
    gsapAnimation!: Animation;

    constructor(gsapAnimation: Animation) {
        if (AppExperience._instance instanceof AppExperience) {
            return AppExperience._instance
        }
        super(camera3dSpace, defaultExperienceOptions);

        this.gsapAnimation = gsapAnimation
        this.world = new World(this);


        //Time tick event
        this.updateWithTick = this.updateWithTick.bind(this)
        this.time.on('tick', this.updateWithTick)

        // window resize
        this.onResize = this.onResize.bind(this)
        this.sizes.on('resize', this.onResize)

        // Create Singleton
        AppExperience._instance = this;
    }

    onResize() {
        // console.log(this)
        this.world.resize()
    }

    updateWithTick() {
        this.world.update()
        this.camera.update()
        this.renderer.update()
    }

    destroyExperience() {
        this.world.destroy();
        this.destroyDefaultExperience();
        AppExperience._instance = null;
    }
}