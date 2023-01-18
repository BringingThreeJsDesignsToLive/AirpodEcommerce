import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import React, { useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import productsData from '../dummyData'
import '../Style/productDetails.css'
import GsapAnimations from '../utils/gsapAnimations'

interface propsTypes {
    activeProductIndex: number
}
function ProductDetail({ activeProductIndex }: propsTypes) {
    const animation = useRef<GsapAnimations | null>(null);
    const product = useMemo(() => productsData[activeProductIndex], [activeProductIndex]);

    const handleOnClick = () => {
        animation.current!.currentAnimationPage = 'Compactments'
        animation.current?.productDetails.hideComponent();
    }

    useEffect(() => {
        animation.current = new GsapAnimations();

        return () => animation.current?.dispose();
    }, [])

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
                            <p>Bluetooth 5.3 (2021)</p>
                        </div>
                        <div>
                            <h3>Battery Specification</h3>
                            <p>398 mAh at 3.81 V battery</p>
                        </div>
                        <div>
                            <h3>Power Supply</h3>
                            <p> 93 milliwatt hour battery in its stem </p>
                        </div>
                    </section>
                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>Sensitivity</h3>
                            <p className='bar' role={'presentation'}></p>
                            <span>90% - 100%</span>
                        </div>
                        <div>
                            <h3>Frequency Range</h3>
                            <p className='bar' role={'presentation'}></p>
                            <span>100 Hz - 10 kHz</span>
                        </div>
                        <div>
                            <h3>Harmonic Distortion</h3>
                            <p className='bar' role={'presentation'}></p>
                            <span>100 dBSPL, 110 dBSPL</span>
                        </div>
                    </section>
                    <section className='product_detail_spec_sec'>
                        <div>
                            <h3>Type of Codec</h3>
                            <p>AAC Bluetooth Codec </p>
                        </div>
                        <div>
                            <h3>Driver Size</h3>
                            <p>11mm Audio Quality</p>
                        </div>
                        <div>
                            <h3>Ean / Article N</h3>
                            <p>EAN 407 / Article 358627</p>
                        </div>
                    </section>
                </div>


            </div>
            <hr />
            <p onClick={handleOnClick} className='hover-effect arrowed_button'>
                <Link to="/">
                    <span>Watch Completation</span>
                    <ArrowUpRightIcon className='icon' />
                </Link>
            </p>
        </div>
    )
}

export default ProductDetail