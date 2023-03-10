import { MouseEvent } from "react";
import gsap from 'gsap'
import Animation from ".";
import ProductsAnimation from "./ProductsAnimation";
import ProductDetailsAnimation from "./ProductDetailsAnimation";
import ProductCompactment from "./ProductCompactment";

export default class MouseCursorEffect {
    productsAnimation: ProductsAnimation;
    productDetailsAnimation: ProductDetailsAnimation;
    productCompactment!: ProductCompactment;
    appElement: HTMLElement;
    appOuterElement: HTMLElement;
    xCoord!: number;
    yCoord!: number;
    xPosition!: number;
    yPosition!: number;
    cursorWrapper!: HTMLDivElement;
    constructor(animation: Animation) {
        this.productsAnimation = animation.products;
        this.productDetailsAnimation = animation.productDetails
        this.productCompactment = animation.productCompactment;
        this.appElement = document.querySelector('.app') as HTMLElement
        this.appOuterElement = document.querySelector('.app_outer') as HTMLElement

        this.init();
    }

    init() {
        // set up the rounded border line
        this.cursorWrapper = document.createElement('div');
        this.cursorWrapper.style.position = 'absolute';
        this.cursorWrapper.style.zIndex = "10";
        this.cursorWrapper.style.width = '40px';
        this.cursorWrapper.style.height = '40px';
        this.cursorWrapper.style.borderRadius = '50%'
        this.cursorWrapper.style.border = `1px solid black`
        this.cursorWrapper.style.pointerEvents = 'none';
        this.cursorWrapper.style.display = 'flex'
        this.cursorWrapper.style.justifyContent = 'center'
        this.cursorWrapper.style.alignItems = 'center'

        // set up nav arrows
        const leftImg = document.createElement('img');
        const rightImg = document.createElement('img');

        leftImg.src = '/imgs/leftArrow.svg';
        leftImg.classList.add("leftArrowIcon");
        leftImg.style.width = '30px'
        leftImg.style.height = '30px'
        leftImg.style.position = 'absolute'
        leftImg.style.opacity = '0'

        rightImg.src = '/imgs/rightArrow.svg';
        rightImg.classList.add("rightArrowIcon");
        rightImg.style.width = '30px'
        rightImg.style.height = '30px'
        rightImg.style.position = 'absolute'
        rightImg.style.opacity = '0'

        //Add element to the dom
        this.cursorWrapper.append(leftImg, rightImg);
        this.appOuterElement.append(this.cursorWrapper);

        this.mouseClickCallback = this.mouseClickCallback.bind(this);
        this.mouseMoveMentCallback = this.mouseMoveMentCallback.bind(this);
        this.appOuterElement.addEventListener('mousemove', this.mouseMoveMentCallback as any)
        this.appOuterElement.addEventListener('click', this.mouseClickCallback as any)
    }

    mouseClickCallback(e: MouseEvent) {
        // Create Heart beat effect on click
        if (this.cursorWrapper) {
            const tl = gsap.timeline({ defaults: { duration: 0.2, ease: 'Power4.easeOut' } });
            tl
                .to(this.cursorWrapper, { scale: 1.2, ease: 'Power4.easeOut' }, 'start')
                .to(this.cursorWrapper, { opacity: 0, duration: 0.3 }, 'start')
                .to(this.cursorWrapper, { scale: 1 }, 'end')
                .to(this.cursorWrapper, { opacity: 1 }, 'end')
        }

        this.productsAnimation.animate();
        this.productDetailsAnimation.animate();
        this.productCompactment.animate();


    }


    mouseMoveMentCallback(e: MouseEvent) {
        const appRect = e.currentTarget.getBoundingClientRect();



        // Get mouse (x,y) coordinate relative to e.currentTarget element
        this.xCoord = (e.clientX - appRect.left);
        this.yCoord = (e.clientY - appRect.top) - e.currentTarget.clientHeight;


        // Add scroll bar offsets
        this.xCoord = this.xCoord + e.currentTarget.scrollLeft;
        this.yCoord = this.yCoord + e.currentTarget.scrollTop;



        // make mouse values move from 0-1
        this.xPosition = (e.clientX - appRect.left) / appRect.width;
        this.yPosition = (e.clientY - appRect.top) / appRect.height;

        // make mouse values move from -1 - +1
        this.xPosition = (this.xPosition - 0.5) * 2;
        this.yPosition = (this.yPosition - 0.5) * 2;



        this.followCursor(e.clientX, e.clientY);
    }

    followCursor(x: number, y: number) {
        const leftArrowIcon = document.querySelector('.leftArrowIcon');
        const rightArrowIcon = document.querySelector('.rightArrowIcon');

        // check what cursor is currently hovering on
        let shouldHideArrow = this.getShouldHideArrow(document.elementsFromPoint(x, y)[0]);

        // suspend all animations if cursor is hovering on any links else allow
        this.productsAnimation.disableAnimation = shouldHideArrow;
        this.productDetailsAnimation.disableAnimation = shouldHideArrow;
        this.productCompactment.disableAnimation = shouldHideArrow;


        const tl = gsap.timeline({ defaults: { duration: .5 } })
        tl.to(this.cursorWrapper, {
            translateX: `${this.xCoord - 20}px`,
            translateY: `${this.yCoord - 20}px`,
            opacity: shouldHideArrow ? 0.4 : 1
        })
            .to(leftArrowIcon, {
                opacity: (this.xPosition > 0 || shouldHideArrow) ? 0 : 1,
            }, 'arrow')
            .to(rightArrowIcon, {
                opacity: (this.xPosition < 0 || shouldHideArrow) ? 0 : 1,
            }, 'arrow')

    }

    getShouldHideArrow(childElement: Element) {
        // checks if cursor is hovering on any links
        let clickAbleElements = document.querySelectorAll('.hover-effect');
        for (let i = 0; i < clickAbleElements.length; i++) {
            const parentEl = clickAbleElements[i];

            if (parentEl.contains(childElement) || parentEl === childElement) {
                i = clickAbleElements.length + 1;
                return true;
            }

        }
        return false;

    }




    dispose() {
        this.appElement.removeEventListener('mousemove', this.mouseMoveMentCallback as any);
        this.appElement.removeEventListener('click', this.mouseClickCallback as any);
        this.cursorWrapper.remove();
        console.log("disposed")
    }
}