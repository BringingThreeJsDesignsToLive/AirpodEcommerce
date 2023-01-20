import gsap from 'gsap'
import Animation from ".";

export default class ProductDetailsAnimation {
    private animation: Animation;
    productDetailsWrapper: HTMLElement;
    productSpecWrapper: HTMLElement;
    disableAnimation: boolean;
    activeScrollIndex: number;
    constructor(animation: Animation) {
        this.animation = animation;
        this.disableAnimation = false;
        this.activeScrollIndex = 0;
        this.productDetailsWrapper = document.querySelector('.product_detail_wrapper')!;
        this.productSpecWrapper = document.querySelector('.product_detail_specWrapper')!;
    }

    animate() {
        if (this.animation.currentAnimationPage !== 'ProductDetails') this.disableAnimation = true;
        if (this.disableAnimation) return;

        this.scrollSpec()

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
            console.log('backward')
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
                    ease: 'Power4.easeOut'
                }
            )

    }

    hideComponent() {
        if (this.animation.currentAnimationPage === 'Product') {
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
        } else if (this.animation.currentAnimationPage === 'Compactments') {
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
                    this.animation.productCompactment.showComponent();
                }
            })
        }

    }
}