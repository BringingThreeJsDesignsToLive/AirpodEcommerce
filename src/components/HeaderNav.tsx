import React, { useEffect, useRef } from 'react'
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
    useEffect(() => {
        animation.current = new GsapAnimations();

        return () => animation.current?.dispose();
    }, [])
    return (
        <header>
            <nav className='nav_wrapper'>
                <ul>
                    <li className='nav_list_logo'>
                        <NavLink to={'/'}>
                            <ChartBarIcon className='icon' />
                            <span>earbeats</span>

                        </NavLink>
                    </li>
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
                    <li onClick={handleBackClick} className='hover-effect arrowed_button nav_list_Back '>
                        <Link to="/">
                            <span>Back</span>
                            <ArrowUpRightIcon className='icon' />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderNav