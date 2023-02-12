import AppExperience from ".";
import * as THREE from 'three'
import gsap from "gsap";

export default class Loading {
    loadingManager: THREE.LoadingManager
    constructor(experience: AppExperience) {
        this.loadingManager = new THREE.LoadingManager();

        this.loadingManager.onLoad = this.onLoad.bind(this);
        this.loadingManager.onError = this.onError.bind(this);
    }

    private onLoad() {
        const loadingDiv = document.querySelector(".loadingCover")
        const tl = gsap.timeline({});

        tl.to(
            loadingDiv,
            {
                opacity: 0,
                duration: 1
            }
        ).to(
            loadingDiv,
            {
                display: "none",
                duration: 0
            })
    }

    private onError(url: string) {
        alert("Failed to load Airpod 3D model");
        console.log(url)
    }
}