import { EventEmitter } from './EventEmitter'
import { DefaultExperienceOptions } from './types';

export default class Sizes extends EventEmitter {
    public width: number;
    public canvas: HTMLCanvasElement;
    public height: number;
    private useWindowSizeOnResize: boolean;
    public pixelRatio: number;
    public isMobileScreen: boolean;
    constructor(canvas: HTMLCanvasElement, options: DefaultExperienceOptions) {
        // Initialize
        super()
        this.canvas = canvas;
        this.useWindowSizeOnResize = options.useWindowSizeOnResize;
        this.width = canvas.getBoundingClientRect().width;
        this.height = canvas.getBoundingClientRect().height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        if (window.innerWidth > 768) this.isMobileScreen = false;
        else this.isMobileScreen = true;


        // On Resize
        window.addEventListener('resize', this.resizeEventCallback)
    }

    private resizeEventCallback = () => {
        // update values on screen resize

        if (this.useWindowSizeOnResize) {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        } else {
            this.canvas.width = this.canvas.parentElement?.getBoundingClientRect().width || this.canvas.width
            this.canvas.height = this.canvas.parentElement?.getBoundingClientRect().height || this.canvas.height
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        }

        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        if (window.innerWidth > 768) this.isMobileScreen = false;
        else this.isMobileScreen = true;
        this.trigger('resize')
    }

    destroy = () => {
        window.removeEventListener('resize', this.resizeEventCallback);
        this.off('resize');
    }
}