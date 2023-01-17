import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'
import '../Style/products.css'
import productsData from '../dummyData'

function Products() {
    return (
        <div className="product_wrapper">
            <div className='product'>
                {
                    productsData.map((product, index) => (
                        <div className={`product-info product${index} ${index === 0 ? 'active' : ''}`}>
                            <h1 className='product_brand'>{product.brand}</h1>
                            <h2 className='product_name'>{product.name}</h2>
                            <p className='product-details'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, est voluptates. Aliquid minima voluptas facere totam nemo dolore repellat, distinctio, rem nam molestiae doloremque voluptates! Minus ea temporibus atque necessitatibus.
                            </p>
                        </div>
                    ))
                }
                <Link to="/">
                    <span>EXPLORE PRODUCT</span>
                    <ArrowUpRightIcon className='icon' />
                </Link>
            </div>
        </div>
    )
}

export default Products