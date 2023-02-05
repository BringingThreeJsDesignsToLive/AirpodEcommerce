import * as THREE from "three";
import gsap from 'gsap'
import { cloneDeep } from 'lodash'
import AppExperience from ".";
import DebugUI from "../utils/DebugUI";
import ResourcesLoader from "../utils/ResourcesLoader";
import { sourceCompactmentClone, sourcesCompactmentNames } from "./sources";
import { AnimateMethodProps } from "./types";
import Airpods from "./Airpods";
import { Vector3 } from "three";

type CompactmentChildrenTargetType = Array<Vector3>
type CompactmentChildrenMaterialsType = Array<THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial>;
export default class AirpodsCompactment {
    private experience: AppExperience;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private resourceLoader: ResourcesLoader;
    private debugUI: DebugUI;
    private loadedResource: Record<sourcesCompactmentNames, any>;
    private airpods!: Airpods
    private activeProductIndex!: number;
    activeModelClone!: THREE.Mesh | null;
    activeModelCloneMaterials!: CompactmentChildrenMaterialsType;
    disableAnimation: boolean;
    compactmentModel: any;
    compactmentChildrenMaterials!: CompactmentChildrenMaterialsType;
    constructor(experience: AppExperience) {
        this.experience = experience;
        this.scene = experience.scene;
        this.camera = experience.camera.cameraInstance;
        this.debugUI = experience.debugUI;
        this.resourceLoader = experience.resourcesLoader;
        this.loadedResource = experience.resourcesLoader?.items as Record<sourcesCompactmentNames, any>
        this.disableAnimation = false;

    }

    init() {
        const groupName = sourceCompactmentClone[0].groupName
        this.resourceLoader.loadSources(sourceCompactmentClone);

        this.resourceLoader.on(`${groupName}Ready`, () => {
            this.compactmentModel = this.loadedResource.compactment.scene.children[0];
            this.compactmentChildrenMaterials = [];

            // Extarct the material and Hide compactment
            this.loadedResource.compactment.scene.traverse((child: any) => {
                if (child instanceof THREE.Mesh) {
                    child.material.transparent = true;
                    child.material.opacity = 0;
                    if (!this.compactmentChildrenMaterials.includes(child.material)) {
                        this.compactmentChildrenMaterials.push(child.material)
                    }

                }
                child.castShadow = true;
                child.receiveShadow = true;
            })

            this.compactmentModel.children.forEach((child: THREE.Mesh) => {
                child.position.y = 0.2
            })

            this.compactmentModel.scale.set(1.3, 1.3, 1.3)
            this.compactmentModel.position.set(0.28, 0.04, -1.10);
            this.compactmentModel.visible = false;
            // this.addDebugUI();
        })
    }

    animate({ currentPage, previousPage, animateDirection, activeIndex }: AnimateMethodProps) {
        this.activeProductIndex = activeIndex;
        this.camera.add(this.compactmentModel);

        if (!this.airpods) this.airpods = this.experience.world.airpods;



        if (!this.activeModelClone) {
            this.activeModelCloneMaterials = [];

            // Clone the active airpod
            this.activeModelClone = this.airpods.models[`airpod${this.activeProductIndex}`].scene.clone();
            this.activeModelClone!.name = `${this.activeModelClone?.name}Clone`

            // Extract activeModel material and hide it
            this.activeModelClone?.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = cloneDeep(child.material);
                    child.material.transparent = true;
                    child.material.opacity = 0;
                    if (!this.activeModelCloneMaterials.includes(child.material)) {
                        this.activeModelCloneMaterials.push(child.material);
                    }

                }
            })

            this.activeModelClone?.position.set(0, 0.04, 0.40);
            this.activeModelClone?.rotation.set(0, 0, 0);
            this.activeModelClone?.scale.set(8, 8, 8);

            this.compactmentModel.add(this.activeModelClone);
        }



        // get a Reference to all the position of object to animate
        const compactmentChildrenTargets: CompactmentChildrenTargetType = this.compactmentModel.children.map((child: THREE.Mesh) => child.position);
        const compactmentChildrenMaterials = [...this.activeModelCloneMaterials, ...this.compactmentChildrenMaterials];


        // I don't need the current and previous page since i know this will be the last page
        switch (animateDirection) {
            case "Highlight":
                this.animateCompactmentHighlight(compactmentChildrenTargets, compactmentChildrenMaterials)
                break;
            case "Hide":
                this.animateCompactmentHide(compactmentChildrenTargets, compactmentChildrenMaterials);
                break;
        }
    }

    animateCompactmentHighlight(
        compactmentChildrenTargets: CompactmentChildrenTargetType,
        compactmentChildrenMaterials: CompactmentChildrenMaterialsType
    ) {
        this.compactmentModel.visible = true;



        const tl = gsap.timeline(
            {
                defaults: {
                    duration: 1,
                }
            }
        )

        tl.to(compactmentChildrenTargets, {
            y: 0,
            stagger: 0.2
        }
        ).to(compactmentChildrenMaterials, {
            opacity: 1
        },
            "<"
        )
    }

    animateCompactmentHide(
        compactmentChildrenTargets: CompactmentChildrenTargetType,
        compactmentChildrenMaterials: CompactmentChildrenMaterialsType
    ) {



        const tl = gsap.timeline(
            {
                defaults: {
                    duration: 1,
                }
            }
        )

        tl.to(compactmentChildrenTargets, {
            y: 0.2,
            stagger: 0.2
        }
        ).to(compactmentChildrenMaterials, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => { // clean up
                this.camera.remove(this.compactmentModel);
                this.compactmentModel.remove(this.activeModelClone);

                // Dispose Cloned object
                this.activeModelClone?.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        if (typeof child.geometry.dispose === 'function') child.geometry.dispose();
                        if (typeof child.material.dispose === 'function') child.material.dispose();
                    }
                })
                this.activeModelClone!.visible = false
                this.compactmentModel.visible = false;
                this.activeModelClone = null;
                this.activeModelCloneMaterials = [];

            }
        },
            "<"
        )
    }

    addDebugUI() {
        if (this.debugUI.isActive) {
            const compactmentFolder = this.debugUI.ui.addFolder({
                title: "Compactments",
                expanded: true
            })

            const PARAMS = {
                compactmentPositions: {
                    x: this.compactmentModel.position.x,
                    y: this.compactmentModel.position.y,
                    z: this.compactmentModel.position.z,
                },
                activeModelClonePosition: {
                    x: this.compactmentModel.position.x,
                    y: this.compactmentModel.position.y,
                    z: this.compactmentModel.position.z,
                }
            }

            compactmentFolder.addInput(PARAMS, "compactmentPositions").on("change", () => {
                const { x, y, z } = PARAMS.compactmentPositions
                this.compactmentModel.position.set(x, y, z)

            })
            compactmentFolder.addInput(PARAMS, "activeModelClonePosition").on("change", () => {
                const { x, y, z } = PARAMS.activeModelClonePosition
                this.activeModelClone?.position.set(x, y, z)

            })
        }
    }

}