import * as THREE from 'three'
import gsap from 'gsap'
import AppExperience from ".";
import DebugUI from '../utils/DebugUI';
import ResourcesLoader from "../utils/ResourcesLoader";
import { sourcesDefaultClone, sourcesDefaultNames } from "./sources";
import { AnimateDirectionType, AnimationPagesType } from '../../gsapAnimations/types';
import Animation from '../../gsapAnimations';
import AirpodsCompactment from './AirpodsCompactment';
import { AnimateMethodProps } from './types';

export default class Airpods {
    private experience: AppExperience;
    private camera: THREE.PerspectiveCamera;
    private resourceLoader: ResourcesLoader;
    private loadedResource: Record<sourcesDefaultNames, any>;
    private scene: THREE.Scene;
    private debugUI: DebugUI
    private airpodsCompactment: AirpodsCompactment;
    private gsapAnimation: Animation;
    private activeProductIndex!: number; // active product index that start from 1
    models!: any;
    private modelDistance!: THREE.Vector3 // The distance between each object relative to the z and x axis
    private productPageActiveModelCoord!: THREE.Vector3; // Active model coordinate just before user left the product page
    private productDetailsPageActiveModelCoord!: THREE.Vector3; // Active model coordinate just before user left the productDetails page
    private animatedModelGsapInstance!: GSAPTimeline;
    disableAnimation: boolean;
    constructor(experience: AppExperience, airpodsCompactment: AirpodsCompactment) {
        this.experience = experience;
        this.camera = experience.camera.cameraInstance;
        this.scene = experience.scene;
        this.debugUI = experience.debugUI;
        this.resourceLoader = experience.resourcesLoader
        this.loadedResource = experience.resourcesLoader?.items as Record<sourcesDefaultNames, any>
        this.airpodsCompactment = airpodsCompactment;
        this.disableAnimation = false;

        this.gsapAnimation = experience.gsapAnimation;
    }

    init() {
        this.setUpModel();
    }

    setUpModel() {
        this.resourceLoader.loadSources(sourcesDefaultClone);
        const groupName = sourcesDefaultClone[0].groupName

        this.resourceLoader.on(`${groupName}Ready`, () => {
            //  initialize airpods compactment after airpods has loaded
            this.airpodsCompactment.init();

            this.models = {
                airpod1: this.loadedResource.airpod1,
                airpod2: this.loadedResource.airpod2,
                airpod3: this.loadedResource.airpod3,
                airpod4: this.loadedResource.airpod4,
                airpod5: this.loadedResource.airpod5,
            }

            // Prepare Object and add them to scene
            this.activeProductIndex = 1;
            this.modelDistance = new THREE.Vector3(4, 1, 6);
            this.productPageActiveModelCoord = new THREE.Vector3();
            this.productDetailsPageActiveModelCoord = new THREE.Vector3();

            let index: number = 1;
            for (const key in this.models) {
                if (Object.prototype.hasOwnProperty.call(this.models, key)) {
                    const model = this.models[key];
                    model.scene.traverse((child: any) => {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    })

                    model.scene.name = key;
                    model.scene.position.z = -this.modelDistance.z * index;
                    model.scene.position.x = this.modelDistance.x * index;
                    model.scene.position.y = this.modelDistance.y;
                    model.scene.scale.set(23, 23, 23)
                    index++
                    this.scene.add(model.scene);
                }
            }


            this.animatedModelGsapInstance = this.animateActiveModel();


            // this.addDebugUI();

        })
    }

    animate({ currentPage, previousPage, animateDirection, activeIndex }: AnimateMethodProps) {
        this.activeProductIndex = activeIndex;
        switch (currentPage) {
            case "Product":
                this.animateOnProductPage(animateDirection, previousPage);
                break;
            case "ProductDetails":

                this.animateProductDetails(animateDirection, previousPage)
                break;
            case "Compactments":
                this.animateProductCompactment(animateDirection, previousPage);
                break;

            default:
                break;
        }
    }

    private animateOnProductPage(animateDirection: AnimateDirectionType, previousPage: AnimationPagesType) {
        const activeModel = this.models[`airpod${this.activeProductIndex}`]

        const otherModels = this.getUnactiveModels(activeModel);

        if (animateDirection === 'Forward') {
            // animate the camera forward base on the object distance
            gsap.to(
                this.camera.position,
                {
                    z: `-=${this.modelDistance.z}`,
                    x: `+=${this.modelDistance.x}`,
                    ease: 'power1.inOut',
                    duration: 1,
                    onComplete: () => {
                        this.disableAnimation = false;
                        this.animatedModelGsapInstance.revert();
                        this.animatedModelGsapInstance = this.animateActiveModel();
                    }
                }
            )
        } else if (animateDirection === 'Backward') {
            // animate the camera backward base on the object distance
            gsap.to(
                this.camera.position,
                {
                    z: `+=${this.modelDistance.z}`,
                    x: `-=${this.modelDistance.x}`,
                    ease: 'power1.inOut',
                    duration: 1,
                    onComplete: () => {
                        this.disableAnimation = false;
                        this.animatedModelGsapInstance.revert();
                        this.animatedModelGsapInstance = this.animateActiveModel();
                    }
                }
            )
        } else if (animateDirection === 'Default') {
            const tl = gsap.timeline({ defaults: { duration: 1 } })
            tl.to(
                activeModel.scene.position,
                {
                    x: this.productPageActiveModelCoord.x,
                    y: this.productPageActiveModelCoord.y,
                    z: this.productPageActiveModelCoord.z,
                }
            ).to(
                activeModel.scene.scale,
                {
                    x: 23,
                    y: 23,
                    z: 23
                },
                "<"
            ).to(otherModels, {
                visible: true,
                onComplete: () => {
                    this.disableAnimation = false;
                }
            })
        }
    }

    private animateProductDetails(animateDirection: AnimateDirectionType, previousPage: AnimationPagesType) {
        const activeModel = this.models[`airpod${this.activeProductIndex}`]

        const otherModels = this.getUnactiveModels(activeModel);
        if (animateDirection === 'Highlight') {
            const activeModelNewPosition = new THREE.Vector3()
            if (previousPage === "Product") {
                // get the current position and save it before you animate
                this.productPageActiveModelCoord.x = activeModel.scene.position.x;
                this.productPageActiveModelCoord.y = activeModel.scene.position.y;
                this.productPageActiveModelCoord.z = activeModel.scene.position.z;

                //  get the new animation location
                activeModelNewPosition.x = activeModel.scene.position.x - 0.8;
                activeModelNewPosition.y = activeModel.scene.position.y - 0.5;
                activeModelNewPosition.z = activeModel.scene.position.z;

                // update productDetailsPageActiveModelCoord with new Positions
                this.productDetailsPageActiveModelCoord.copy(activeModelNewPosition);
            } else if (previousPage === 'Compactments') {
                activeModelNewPosition.copy(this.productDetailsPageActiveModelCoord);
            }

            const tl = gsap.timeline({ defaults: { duration: 1 } })



            tl.to(
                otherModels,
                {
                    visible: false,
                    duration: 0
                },
            ).to(activeModel.scene,
                {
                    visible: true,
                    duration: 0
                },
                "<"
            )
                .to(activeModel.scene.position,
                    {
                        x: `${activeModelNewPosition.x}`,
                        y: `${activeModelNewPosition.y}`
                    }
                ).to(activeModel.scene.scale,
                    {
                        x: 21,
                        y: 21,
                        z: 21,
                        onComplete: () => {
                            this.disableAnimation = false;
                        }
                    },
                    "<"
                )

        } else if (animateDirection === 'Default') {
            const tl = gsap.timeline({ defaults: { duration: 1 } })
            tl.to(
                activeModel.scene.position,
                {
                    x: this.productPageActiveModelCoord.x,
                    y: this.productPageActiveModelCoord.y,
                    z: this.productPageActiveModelCoord.z
                }
            ).to(otherModels, {
                visible: true,
                onComplete: () => {
                    this.disableAnimation = false;
                }
            })
        }
    }

    private animateProductCompactment(animateDirection: AnimateDirectionType, previousPage: AnimationPagesType) {
        const activeModel = this.models[`airpod${this.activeProductIndex}`];
        if (animateDirection === 'Hide') {
            const tl = gsap.timeline({ defaults: { duration: 1 } })

            tl.to(activeModel.scene.position,
                {
                    x: "-=3.0"
                }
            ).to(activeModel.scene, {
                visible: false,
                onComplete: () => {
                    this.disableAnimation = false;
                }
            })
        }

    }

    private animateActiveModel(): GSAPTimeline {

        const tl = gsap.timeline({ defaults: { duration: 10 } })

        return tl.to(this.models[`airpod${this.activeProductIndex}`].scene.children[0].position,
            {
                y: "0.005",
                yoyo: true,
                ease: 'power1.inOut',
                yoyoEase: true,
                repeat: -1
            },
            "start"
        )
            .to(this.models[`airpod${this.activeProductIndex}`].scene.children[1].rotation,
                {
                    y: `${Math.PI * 2}`,
                    yoyo: true,
                    ease: 'power1.inOut',
                    yoyoEase: true,
                    repeat: -1
                },
                "start"
            )
    }

    private getUnactiveModels(activeModel: any) {
        const unactiveModels = []
        for (const key in this.models) {
            if (Object.prototype.hasOwnProperty.call(this.models, key)) {
                const model = this.models[key];
                if (activeModel !== model) {
                    unactiveModels.push(model.scene)
                }

            }
        }

        return unactiveModels
    }

    private addDebugUI() {
        if (this.debugUI.isActive) {
            const airpodFolder = this.debugUI.ui.addFolder({
                title: "Airpods",
                expanded: true
            })

            const PARAMS = {
                airpods1Positions: {
                    x: this.models.airpod1.scene.position.x,
                    y: this.models.airpod1.scene.position.y,
                    z: this.models.airpod1.scene.position.z,
                },
                airpods1Scale: {
                    x: this.models.airpod1.scene.scale.x,
                    y: this.models.airpod1.scene.scale.y,
                    z: this.models.airpod1.scene.scale.z,
                },
                airpods2Positions: {
                    x: this.models.airpod2.scene.position.x,
                    y: this.models.airpod2.scene.position.y,
                    z: this.models.airpod2.scene.position.z,
                },
                airpods3Positions: {
                    x: this.models.airpod3.scene.position.x,
                    y: this.models.airpod3.scene.position.y,
                    z: this.models.airpod3.scene.position.z,
                },
            }

            airpodFolder.addInput(PARAMS, 'airpods1Positions').on('change', () => {
                const { x, y, z } = PARAMS.airpods1Positions;
                this.models.airpod1.scene.position.set(x, y, z)
            })
            airpodFolder.addInput(PARAMS, 'airpods1Scale').on('change', () => {
                const { x, y, z } = PARAMS.airpods1Scale;
                this.models.airpod1.scene.scale.set(x, y, z)
            })

            airpodFolder.addInput(PARAMS, 'airpods2Positions').on('change', () => {
                const { x, y, z } = PARAMS.airpods2Positions;
                this.models.airpod2.scene.position.set(x, y, z)
            })
            airpodFolder.addInput(PARAMS, 'airpods3Positions').on('change', () => {
                const { x, y, z } = PARAMS.airpods3Positions;
                this.models.airpod3.scene.position.set(x, y, z)
            })
        }
    }

    update() {

    }

    destroy() {

    }
}