import gsap from 'gsap'
import Animation from ".";

export default class HeaderNav {
    private animation: Animation;
    constructor(animation: Animation) {
        this.animation = animation
    }

    hideNavLinks() {
        const navLinks = document.querySelectorAll('.nav_list_link')!;
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
        const navLinks = document.querySelectorAll('.nav_list_link')!;
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