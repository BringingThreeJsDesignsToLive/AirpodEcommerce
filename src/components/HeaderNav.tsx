import React from 'react'
import { NavLink } from 'react-router-dom';
import '../Style/headerNav.css';
import { ChartBarIcon } from '@heroicons/react/24/solid'

function HeaderNav() {
    return (
        <header>
            <nav className='nav_wrapper'>
                <ul>
                    <li className='nav_list'>
                        <NavLink to={'/'}>
                            <ChartBarIcon className='icon' />
                            <span>earbeats</span>

                        </NavLink>
                    </li>
                    <li className='nav_list'>
                        <NavLink to={'/'}>
                            Earbuds
                        </NavLink>
                    </li>
                    <li className='nav_list'>
                        <NavLink to={'/'}>
                            Headphones
                        </NavLink>
                    </li>
                    <li className='nav_list'>
                        <NavLink to={'/'}>
                            Accessories
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderNav