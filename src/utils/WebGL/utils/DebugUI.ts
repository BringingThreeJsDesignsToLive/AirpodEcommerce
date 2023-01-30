
import { Pane } from 'tweakpane'
export default class DebugUI {
    isActive: boolean;
    ui!: Pane;
    debugFolder: object = {}
    constructor() {
        this.isActive = window.location.hash === '#debug'
        if (this.isActive) {
            this.ui = new Pane({ title: 'Tweak Values' });
        }

    }

    destroy() {
        if (this.isActive) {
            this.ui.dispose();
        }

    }
}