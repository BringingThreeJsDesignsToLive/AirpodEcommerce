import gsap from 'gsap'
import Animation from ".";
import AppWebGLExperience from '../WebGL/appExperience'

export default class ProductDetailsAnimation {
    private animation: Animation;
    productDetailsWrapper: HTMLElement;
    productSpecWrapper: HTMLElement;
    disableAnimation: boolean;
    activeScrollIndex: number;
    private webGLExperience: AppWebGLExperience;
    constructor(animation: Animation) {
        this.animation = animation;
        this.webGLExperience = animation.webGLExperience;
        this.disableAnimation = false;
        this.activeScrollIndex = 0;
        this.productDetailsWrapper = document.querySelector('.product_detail_wrapper')!;
        this.productSpecWrapper = document.querySelector('.product_detail_specWrapper')!;
    }

    animate() {
        if (this.animation.currentAnimationPage !== 'ProductDetails') this.disableAnimation = true;
        if (this.disableAnimation || this.webGLExperience.world.airpods.disableAnimation) return;

        this.scrollSpec();
    }

    scrollSpec() {
        const distance = this.productSpecWrapper.children[0].clientWidth;

        if (this.animation.mouseEffect.xPosition > 0) { // animate forward
            this.activeScrollIndex++

            if (this.activeScrollIndex >= (this.productSpecWrapper.children.length)) {
                return this.activeScrollIndex = this.productSpecWrapper.children.length - 1;
            }

            gsap.to(this.productSpecWrapper, {
                translateX: `-${distance * this.activeScrollIndex}px`,
                duration: 1,
                ease: 'power4.Out'
            })

        } else if (this.animation.mouseEffect.xPosition < 0) { // animate backward
            this.activeScrollIndex--

            if (this.activeScrollIndex <= 0) {
                this.activeScrollIndex = 0;
            }

            gsap.to(this.productSpecWrapper, {
                translateX: `-${distance * this.activeScrollIndex}px`,
                duration: 1,
                ease: 'power4.Out'
            })
        }
    }

    showComponent() {
        this.disableAnimation = true;
        this.webGLExperience.world.airpods.disableAnimation = true;

        this.webGLExperience.world.airpods.animate({
            currentPage: this.animation.currentAnimationPage,
            previousPage: this.animation.previousAnimationPage,
            activeIndex: this.animation.products.productInfoCurrentIndex,
            animateDirection: "Highlight"
        })
        const appMain = document.querySelector('.app > main') as HTMLElement;

        const tl = gsap.timeline({ defaults: { duration: 0 } })
        tl.to(
            appMain,
            {
                justifyContent: 'end',
                alignItems: 'center',
            },
        ).to(
            this.productDetailsWrapper,
            {
                display: 'block',
                translateY: '0px',
                opacity: 1,
            })
            .fromTo(
                this.productDetailsWrapper.children,
                {
                    translateY: '20px',
                    opacity: 0,
                },
                {
                    opacity: 1,
                    translateY: '0px',
                    stagger: 0.2,
                    duration: 0.6,
                    ease: 'Power4.easeOut',
                    onComplete: () => {
                        this.disableAnimation = false;
                    }
                }
            )

    }

    hideComponent() {
        this.disableAnimation = true;
        this.webGLExperience.world.airpods.disableAnimation = true;

        if (this.animation.currentAnimationPage === 'Product') {
            // animate webGL
            this.webGLExperience.world.airpods.animate({
                currentPage: this.animation.currentAnimationPage,
                previousPage: this.animation.previousAnimationPage,
                activeIndex: this.animation.products.productInfoCurrentIndex,
                animateDirection: "Default"
            })


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
                    onComplete: () => {
                        this.disableAnimation = false;
                    }
                })
        } else if (this.animation.currentAnimationPage === 'Compactments') {
            // animate webGL
            this.webGLExperience.world.airpods.animate({
                currentPage: this.animation.currentAnimationPage,
                previousPage: this.animation.previousAnimationPage,
                activeIndex: this.animation.products.productInfoCurrentIndex,
                animateDirection: "Hide"
            })


            const tl = gsap.timeline({})
            tl.to(this.productDetailsWrapper, {
                translateY: '-200px',
                opacity: 0,
                duration: .5,
                ease: 'power3.out'
            }).to(this.productDetailsWrapper, {
                display: 'none',
                duration: 0,
                onComplete: () => {
                    this.disableAnimation = false;
                    this.animation.productCompactment.showComponent();
                }
            })
        }

    }
}