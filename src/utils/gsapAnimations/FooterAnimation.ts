import gsap from 'gsap'
import Animation from ".";

export default class FooterAnimation {
    private animation: Animation
    footerPagination: HTMLElement
    constructor(animation: Animation) {
        this.animation = animation;
        this.footerPagination = document.querySelector('.footer-pagination-index')!;
    }

    hidePaginationIndex() {

        gsap.to(this.footerPagination, {
            opacity: 0,
            translateY: '50px'
        })
    }

    showPaginationIndex() {
        gsap.to(this.footerPagination, {
            opacity: 1,
            translateY: '0px'
        })
    }
}