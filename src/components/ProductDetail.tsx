import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import productsData from '../dummyData'
import '../Style/productDetails.css'

interface propsTypes {
    activeProductIndex: number
}
function ProductDetail({ activeProductIndex }: propsTypes) {
    const product = useMemo(() => productsData[activeProductIndex], [activeProductIndex]);

    return (
        <div className="product_detail_wrapper">
            <h1 className='product_detail_brand'>{product.brand}</h1>
            <h2 className='product_detail_name'>{product.name}</h2>
            <div className='product_detail_summary'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere laudantium quia saepe repudiandae atque ad explicabo mollitia? Nobis ratione</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere laudantium quia saepe repudiandae atque ad explicabo mollitia? Nobis ratione</p>
            </div>
            <div className='product_details_spec'>
                <div className='product_detail_specWrapper'>
                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>BlueTooth Version</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                        <div>
                            <h3>Battery Specification</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                        <div>
                            <h3>Power Supply</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                    </section>
                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>Sensitivity</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                        <div>
                            <h3>Frequency Range</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                        <div>
                            <h3>Harmonic Distortion</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                    </section>
                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>Type of Codec</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                        <div>
                            <h3>Driver Size</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                        <div>
                            <h3>Ean / Article N</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat earum </p>
                        </div>
                    </section>
                </div>


            </div>
            <hr />
            <p className='hover-effect arrowed_button'>
                <Link to="/">
                    <span>Watch Completation</span>
                    <ArrowUpRightIcon className='icon' />
                </Link>
            </p>
        </div>
    )
}

export default ProductDetail