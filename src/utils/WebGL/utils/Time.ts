import { EventEmitter } from "./EventEmitter";

export default class Time extends EventEmitter {
    private start: number
    public currentTime: number
    public elaspedTime: number
    public deltaTime: number

    constructor() {
        // Initialize
        super()
        this.start = Date.now();
        this.currentTime = this.start;
        this.elaspedTime = 0;
        this.deltaTime = 16;

        this.tick()

    }
    private tick() {
        // run on each requestAnimation Frame
        const currentTime = Date.now();
        this.deltaTime = currentTime - this.currentTime
        this.currentTime = currentTime
        this.elaspedTime = currentTime - this.start

        this.trigger('tick')
        window.requestAnimationFrame(this.tick.bind(this))
    }

    destroy() {
        this.off('tick');
    }
}