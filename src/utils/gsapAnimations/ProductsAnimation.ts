import gsap from 'gsap'
import Animation from '.';
import AppWebGLExperience from '../WebGL/appExperience'
import { getIndexNumberReturnType } from './types';



export default class ProductsAnimation {
    private animation: Animation;
    products: NodeListOf<Element>;
    currentActive: HTMLElement | null;
    disableAnimation: boolean;
    productInfoCurrentIndex: number;
    private webGLExperience: AppWebGLExperience;
    constructor(animation: Animation) {
        this.animation = animation
        this.webGLExperience = animation.webGLExperience;
        this.disableAnimation = false;
        this.productInfoCurrentIndex = 1;
        this.products = document.querySelectorAll('.product-info');
        this.currentActive = document.querySelector('.product-info.active');
    }

    animate() {
        if (this.animation.currentAnimationPage !== 'Product') this.disableAnimation = true;

        // Don't animate until all previous HtMl and WebGL animation is done
        if (this.disableAnimation || this.webGLExperience.world.airpods.disableAnimation) return;



        const indexDetails = this.getActiveProductIndex();



        if (indexDetails.animateDirection === 'Forward') { // animate forward
            // disable animation, will be re-enable when all animation is done
            this.disableAnimation = true;
            this.webGLExperience.world.airpods.disableAnimation = true;

            this.productInfoCurrentIndex++;
            this.slideUp(indexDetails.index);
            this.webGLExperience.world.airpods.animate({
                currentPage: this.animation.currentAnimationPage,
                previousPage: this.animation.previousAnimationPage,
                activeIndex: this.productInfoCurrentIndex,
                animateDirection: indexDetails.animateDirection
            })


        } else if (indexDetails.animateDirection === 'Backward') { // animate backward
            // disable animation, will be re-enable when all animation is done
            this.disableAnimation = true;
            this.webGLExperience.world.airpods.disableAnimation = true;

            this.productInfoCurrentIndex--;
            this.slideDown(indexDetails.index);
            this.webGLExperience.world.airpods.animate({
                currentPage: this.animation.currentAnimationPage,
                previousPage: this.animation.previousAnimationPage,
                activeIndex: this.productInfoCurrentIndex,
                animateDirection: indexDetails.animateDirection
            })
        }
    }

    slideUp(index: number) {
        const footerIndex = document.querySelector('.footer-index') as HTMLSpanElement
        const activeProductInfo = this.products[index];
        const incomingElement = this.products[index + 1];

        const tl = gsap.timeline({ defaults: { duration: .4 } });
        tl.to(activeProductInfo.children, {
            translateY: '-20px',
            opacity: 0,
            stagger: 0.2,
        })
            .to(activeProductInfo, { display: 'none', duration: 0 })
            .to(incomingElement, { display: 'block', duration: 0 })
            .fromTo(
                incomingElement.children,
                {
                    opacity: 0,
                    translateY: '20px',
                    duration: 0
                },
                {
                    opacity: 1,
                    translateY: '0px',
                    stagger: 0.2,
                    onComplete: () => {
                        activeProductInfo.classList.remove('active');
                        incomingElement.classList.add('active');
                        this.disableAnimation = false;
                        footerIndex.innerHTML = this.productInfoCurrentIndex > 9 ? `${this.productInfoCurrentIndex}` : `0${this.productInfoCurrentIndex}`
                    }
                }
            )
    }

    slideDown(index: number) {
        const footerIndex = document.querySelector('.footer-index') as HTMLSpanElement
        const activeProductInfo = this.products[index]
        const incomingElement = this.products[index - 1];

        const tl = gsap.timeline({ defaults: { duration: .4 } });
        tl.to(activeProductInfo.children, {
            translateY: '20px',
            opacity: 0,
            stagger: 0.2,
        })
            .to(activeProductInfo, { display: 'none', duration: 0 })
            .to(incomingElement, { display: 'block', duration: 0 })
            .fromTo(
                incomingElement.children,
                {
                    opacity: 0,
                    translateY: '-20px',
                    duration: 0
                },
                {
                    opacity: 1,
                    translateY: '0px',
                    stagger: 0.2,
                    onComplete: () => {
                        activeProductInfo.classList.remove('active');
                        incomingElement.classList.add('active');
                        this.disableAnimation = false;
                        footerIndex.innerHTML = this.productInfoCurrentIndex > 9 ? `${this.productInfoCurrentIndex}` : `0${this.productInfoCurrentIndex}`
                    }
                }
            )
    }

    getActiveProductIndex(): getIndexNumberReturnType {
        const activeProductInfo = document.querySelector('.product-info.active') as HTMLElement;
        const index = parseInt(activeProductInfo.id[activeProductInfo?.id.length - 1]);

        if (this.animation.mouseEffect.xPosition > 0 && this.products.length - 1 > index && !this.disableAnimation) {
            return {
                index,
                animateDirection: 'Forward'
            }
        } else if (this.animation.mouseEffect.xPosition < 0 && index > 0 && !this.disableAnimation) {
            return {
                index,
                animateDirection: 'Backward'
            }
        }
        return {
            index,
            animateDirection: 'None'
        }
    }

    hideComponent() {
        // Hide product content on expore product click
        const productWrapper = document.querySelector('.product_wrapper') as HTMLElement;
        const activeProductInfo = document.querySelector('.product-info.active') as HTMLElement;
        const tl = gsap.timeline({});

        tl.to(
            activeProductInfo.children,
            {
                opacity: 0,
                stagger: 0.1,
                duration: 0.5
            }
        )
            .to(
                productWrapper,
                {
                    display: 'none',
                    duration: 0,
                    onComplete: () => {
                        this.animation.productDetails.showComponent();
                        this.webGLExperience.world.depthOfFieldPostProcessing.togglePassesState(false);
                    }
                },
                'hide'
            )


    }

    showComponent() {
        this.webGLExperience.world.depthOfFieldPostProcessing.togglePassesState(true);

        const appMain = document.querySelector('.app > main') as HTMLElement;
        const productWrapper = document.querySelector('.product_wrapper') as HTMLElement;
        const activeProductInfo = document.querySelector('.product-info.active') as HTMLElement;
        const tl = gsap.timeline({});

        tl.to(
            appMain,
            {
                justifyContent: 'start',
                alignItems: 'center',
                duration: 0,
            },
            'show'
        ).to(
            productWrapper,
            {
                display: 'block',
                duration: 0
            },
            'show'
        ).to(
            activeProductInfo.children,
            {
                opacity: 1,
                stagger: 0.1,
                duration: 0.5
            }
        )

    }


}