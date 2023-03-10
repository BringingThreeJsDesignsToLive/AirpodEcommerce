import gsap from 'gsap';
import Animation from ".";
import AppWebGLExperience from '../WebGL/appExperience'

export default class ProductCompactment {
    private animation: Animation;
    private webGLExperience: AppWebGLExperience;
    productCompactmentWrapper: HTMLElement;
    disableAnimation: boolean;
    constructor(animation: Animation) {
        this.animation = animation;
        this.webGLExperience = animation.webGLExperience;
        this.disableAnimation = false;
        this.productCompactmentWrapper = document.querySelector('.product_compactment_wrapper')!;
    }

    animate() {
        if (this.animation.currentAnimationPage !== 'Compactments') this.disableAnimation = true;
        if (this.disableAnimation || this.webGLExperience.world.airpods.disableAnimation) return;

    }

    showComponent() {
        this.disableAnimation = true;
        this.webGLExperience.world.airpodsCompactment.disableAnimation = true;

        this.webGLExperience.world.airpodsCompactment.animate({
            currentPage: this.animation.currentAnimationPage,
            previousPage: this.animation.previousAnimationPage,
            activeIndex: this.animation.products.productInfoCurrentIndex,
            animateDirection: "Highlight"
        })

        const appMain = document.querySelector('.app > main')!;
        const innerList = Array.from(this.productCompactmentWrapper.querySelector('.product_compactment_lists')!.children);
        const wrapperChildren = Array.from(this.productCompactmentWrapper.children);

        const tl = gsap.timeline({ defaults: { duration: 0.8 } });

        tl.to(appMain, {
            justifyContent: 'start',
            alignItems: 'flex-start',
            duration: 0,
        }).to(
            this.productCompactmentWrapper,
            {
                display: 'flex',
                opacity: 1,
                duration: 0
            })
            .fromTo(
                [...wrapperChildren, ...innerList],
                {
                    translateY: '30px',
                    opacity: 0,
                    stagger: 0.2
                },
                {
                    translateY: '0px',
                    opacity: 1,
                    onComplete: () => {
                        this.disableAnimation = false;
                    }
                }
            )
    }
    hideComponent() {
        this.disableAnimation = true;
        this.webGLExperience.world.airpods.disableAnimation = true;

        this.webGLExperience.world.airpodsCompactment.animate({
            currentPage: this.animation.currentAnimationPage,
            previousPage: this.animation.previousAnimationPage,
            activeIndex: this.animation.products.productInfoCurrentIndex,
            animateDirection: "Hide"
        })

        const innerList = Array.from(this.productCompactmentWrapper.querySelector('.product_compactment_lists')!.children);
        const wrapperChildren = Array.from(this.productCompactmentWrapper.children);

        const tl = gsap.timeline({ defaults: { duration: 0.5 } });

        tl.to(
            [...innerList, ...wrapperChildren],
            {
                translateY: '30px',
                opacity: 0,
                stagger: 0.3,
            }
        ).to(
            this.productCompactmentWrapper,
            {
                display: 'none',
                duration: 0,
                onComplete: () => {
                    this.disableAnimation = false;
                    this.animation.productDetails.showComponent();
                }
            })
    }
}