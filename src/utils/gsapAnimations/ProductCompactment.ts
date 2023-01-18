import gsap from 'gsap';
import Animation from ".";

export default class ProductCompactment {
    private animation: Animation;
    productCompactmentWrapper: HTMLElement;
    constructor(animation: Animation) {
        this.animation = animation;
        this.productCompactmentWrapper = document.querySelector('.product_compactment_wrapper')!;
    }

    animate() {

    }

    showComponent() {
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
                    opacity: 1
                }
            )
    }
    hideComponent() {
        const innerList = Array.from(this.productCompactmentWrapper.querySelector('.product_compactment_lists')!.children);
        const wrapperChildren = Array.from(this.productCompactmentWrapper.children);

        const tl = gsap.timeline({ defaults: { duration: 0.8 } });

        tl.to(
            [...wrapperChildren, ...innerList],
            {
                translateY: '30px',
                opacity: 0,
                stagger: 0.2,
            }
        ).to(
            this.productCompactmentWrapper,
            {
                display: 'none',
                duration: 0,
                onComplete: () => this.animation.productDetails.showComponent()
            })
    }
}