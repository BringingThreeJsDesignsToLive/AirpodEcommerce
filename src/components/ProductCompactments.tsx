import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import '../Style/productCompactments.css'

function ProductCompactments() {
    return (
        <div className="product_compactment_wrapper">
            <div className="product_compactment_container">
                <h1>Set Includes:</h1>
                <ol className="product_compactment_lists">
                    <li>
                        <h3>EarBuds M5</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci iure impedit, neque facere alias minima debitis dolor</p>
                    </li>
                    <li>
                        <h3>EarBuds M5</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci iure impedit, neque facere alias minima debitis dolor</p>
                    </li>
                    <li>
                        <h3>EarBuds M5</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci iure impedit, neque facere alias minima debitis dolor</p>
                    </li>
                </ol>

            </div>
            <div className="product_compactment_checkout">
                <p className='hover-effect arrowed_button'>
                    <Link to="/">
                        <span>Buy Now</span>
                        <ArrowUpRightIcon className='icon' />
                    </Link>
                </p>
                <p>$209.0</p>
            </div>
        </div>
    )
}

export default ProductCompactments