import gsap from 'gsap'
import Animation from ".";

export default class ProductDetailsAnimation {
    private animation: Animation;
    productDetailsWrapper: HTMLElement;
    prodectSpecWrapper: HTMLElement;
    disableAnimation: boolean;
    constructor(animation: Animation) {
        this.animation = animation;
        this.disableAnimation = false;
        this.productDetailsWrapper = document.querySelector('.product_detail_wrapper')!;
        this.prodectSpecWrapper = document.querySelector('.product_detail_specWrapper')!;
    }

    animate() {
        if (this.animation.currentAnimationPage !== 'ProductDetails') this.disableAnimation = true;
        if (this.disableAnimation) return;

        let rightValue = window.getComputedStyle(this.prodectSpecWrapper).getPropertyValue('right')!;

        console.log(rightValue)




        if (this.animation.mouseEffect.xPosition > 0) {
            this.scrollSpec('Forward')
        } else if (this.animation.mouseEffect.xPosition < 0) {
            this.scrollSpec('Backward')
        }


    }

    scrollSpec(direction: 'Forward' | 'Backward') {
        if (direction === 'Forward') {

        } else {

        }
    }

    showComponent() {

        const tl = gsap.timeline({})
        tl.to(
            this.productDetailsWrapper,
            {
                display: 'block'
            })
            .fromTo(
                this.productDetailsWrapper.children,
                {
                    translateY: '20px',
                    opacity: 0
                },
                {
                    opacity: 1,
                    translateY: '0px',
                    stagger: 0.2,
                    duration: 1,
                    ease: 'Power4.easeOut'
                }
            )

    }

    hideComponent() {
        const tl = gsap.timeline({})
        tl.to(
            this.productDetailsWrapper.children,
            {
                translateY: '20px',
                opacity: 0,
                duration: 0.5,
                ease: 'Power4.easeOut'
            },
        ).to(
            this.productDetailsWrapper,
            {
                display: 'none',
            })
    }
}