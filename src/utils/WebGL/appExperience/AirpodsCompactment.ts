import AppExperience from ".";

export default class AirpodsCompactment {
    experience: AppExperience;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    constructor(experience: AppExperience) {
        this.experience = experience;
        this.scene = experience.scene;
        this.camera = experience.camera.cameraInstance;

    }
}