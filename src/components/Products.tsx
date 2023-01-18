import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../Style/products.css'
import productsData from '../dummyData'
import GsapAnimations from '../utils/gsapAnimations'

interface propsTypes {
    activeProductIndex: number
}
function Products({ activeProductIndex }: propsTypes) {
    const animation = useRef<GsapAnimations | null>(null);

    const handleClick = () => {
        animation.current?.products.hideComponent();
        animation.current?.headerNav.hideNavLinks();
        animation.current?.footer.hidePaginationIndex();
        animation.current!.currentAnimationPage = 'ProductDetails';
    }
    useEffect(() => {
        animation.current = new GsapAnimations();

        return () => animation.current?.dispose();
    }, [])
    return (
        <div className="product_wrapper">
            <div className='product'>
                {
                    productsData.map((product, index) => (
                        <div id={`product${index}`} key={`product${index}`} className={`product-info ${index === 0 ? 'active' : ''}`}>
                            <h1 className='product_brand'>{product.brand}</h1>
                            <h2 className='product_name'>{product.name}</h2>
                            <p className='product-details'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, est voluptates. Aliquid minima voluptas facere totam nemo dolore repellat, distinctio, rem nam molestiae doloremque voluptates! Minus ea temporibus atque necessitatibus.
                            </p>
                        </div>
                    ))
                }
                <p onClick={handleClick} className='hover-effect arrowed_button'>
                    <Link to="/">
                        <span>EXPLORE PRODUCT</span>
                        <ArrowUpRightIcon className='icon' />
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Products