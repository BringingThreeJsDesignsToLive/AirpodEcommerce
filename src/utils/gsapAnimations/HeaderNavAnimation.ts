import gsap from 'gsap'
import Animation from ".";

export default class HeaderNav {
    private animation: Animation;
    disableAnimation: boolean
    constructor(animation: Animation) {
        this.animation = animation;
        this.disableAnimation = false;
    }

    hamburgerClick(isOpen: boolean) {
        this.disableAnimation = true;
        const firstLine = document.querySelector(".hamburgerFirst") as HTMLSpanElement;
        const secondLine = document.querySelector(".hamburgerSecond") as HTMLSpanElement;
        const thirdLine = document.querySelector(".hamburgerThird") as HTMLSpanElement;
        const navWrapper = document.querySelector(".nav_wrapper.mobile ul") as HTMLElement;

        const together = [firstLine, secondLine, thirdLine];
        if (isOpen) { // then close it
            const tl = gsap.timeline({ defaults: { duration: 0.2 } });
            tl.to(firstLine,
                {
                    rotate: "0"
                },
                "rotate"
            ).to(thirdLine,
                {
                    rotate: "-0"
                },
                "rotate"
            ).to(secondLine,
                {
                    scaleY: 1
                }
            ).to(together,
                {
                    scaleX: 0.5
                }
            ).to(navWrapper,
                {
                    scaleY: 0,
                    onComplete: () => { this.disableAnimation = false }
                }
            )

        } else { // open it
            const tl = gsap.timeline({ defaults: { duration: 0.2 } });
            tl.to(together,
                {
                    scaleX: 1
                }
            ).to(secondLine,
                {
                    scaleY: 0
                }
            ).to(firstLine,
                {
                    rotate: "40deg"
                },
                "rotate"
            ).to(thirdLine,
                {
                    rotate: "-40deg"
                },
                "rotate"
            ).to(navWrapper,
                {
                    scaleY: 1,
                    onComplete: () => { this.disableAnimation = false }
                }
            )
        }
    }

    hideNavLinks() {
        const navLinks = document.querySelectorAll('.nav_wrapper')!;
        const navLinkBack = document.querySelectorAll('.nav_list_Back')!;

        const tl = gsap.timeline({ defaults: { duration: 1, } });
        tl.to(
            navLinks,
            {
                translateY: '-50px',
                opacity: 0,
                pointerEvents: 'none'

            },
            'together'
        )
            .to(
                navLinkBack,
                {
                    translateY: '0px',
                    pointerEvents: 'auto',
                    opacity: 1,
                },
                'together'
            )
    }

    showNavLinks() {
        const navLinks = document.querySelectorAll('.nav_wrapper')!;
        const navLinkBack = document.querySelectorAll('.nav_list_Back')!;

        const tl = gsap.timeline({ defaults: { duration: 1, } });
        tl.to(
            navLinks,
            {
                translateY: '0px',
                opacity: 1,
                pointerEvents: 'auto'

            },
            'together'
        )
            .to(
                navLinkBack,
                {
                    translateY: '50px',
                    pointerEvents: 'none',
                    opacity: 0,
                },
                'together'
            )
    }

}