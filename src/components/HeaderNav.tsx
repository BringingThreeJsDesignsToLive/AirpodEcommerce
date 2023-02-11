import React, { useEffect, useRef, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom';
import '../Style/headerNav.css';
import { ArrowUpRightIcon, ChartBarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import GsapAnimations from '../utils/gsapAnimations'

function HeaderNav() {
    const animation = useRef<GsapAnimations | null>(null);

    const handleBackClick = () => {
        if (animation.current?.currentAnimationPage === 'ProductDetails') {
            // The order matters
            animation.current.previousAnimationPage = 'ProductDetails';
            animation.current.currentAnimationPage = 'Product';
            animation.current.productDetails.hideComponent();
            animation.current.products.showComponent();
            animation.current.headerNav.showNavLinks();
            animation.current.footer.showPaginationIndex();
        } else if (animation.current?.currentAnimationPage === 'Compactments') {
            // The order matters
            animation.current.previousAnimationPage = 'Compactments';
            animation.current.currentAnimationPage = 'ProductDetails';
            animation.current.productCompactment.hideComponent();
        }
    }

    const handleHamburgerClick = (e: MouseEvent<HTMLDivElement>): void => {
        if (animation.current?.headerNav.disableAnimation) return;
        const isOpen = e.currentTarget.getAttribute("data-isopen");

        animation.current?.headerNav.hamburgerClick(isOpen === "true" ? true : false);
        e.currentTarget.setAttribute("data-isopen", isOpen === "true" ? "false" : "true");
    }
    useEffect(() => {
        animation.current = new GsapAnimations();

    }, [])
    return (
        <header className='hover-effect reset'>
            <div className='nav_list_logo'>
                <NavLink to={'/'}>
                    <ChartBarIcon className='icon' />
                    <span>earbeats</span>

                </NavLink>
            </div>
            <nav className='nav_wrapper web'>
                <ul>
                    <li className='nav_list_link hover-effect'>
                        <NavLink to={'/'}>
                            Earbuds
                        </NavLink>
                    </li>
                    <li className='nav_list_link hover-effect'>
                        <NavLink to={'/'}>
                            Headphones
                        </NavLink>
                    </li>
                    <li className='nav_list_link hover-effect'>
                        <NavLink to={'/'}>
                            Accessories
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <nav className='nav_wrapper mobile'>
                <div data-isopen="false" onClick={handleHamburgerClick} className='hamburger'>
                    <span className='hamburgerFirst'></span>
                    <span className='hamburgerSecond'></span>
                    <span className='hamburgerThird'></span>
                </div>
                <ul>
                    <li className='nav_list_link mobile'>
                        <NavLink to={'/'}>
                            Earbuds
                        </NavLink>
                    </li>
                    <li className='nav_list_link mobile'>
                        <NavLink to={'/'}>
                            Headphones
                        </NavLink>
                    </li>
                    <li className='nav_list_link mobile'>
                        <NavLink to={'/'}>
                            Accessories
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div onClick={handleBackClick} className='hover-effect arrowed_button nav_list_Back '>
                <Link to="/">
                    <span>Back</span>
                    <ArrowUpRightIcon className='icon' />
                </Link>
            </div>
        </header>
    )
}

export default HeaderNav