import FooterAnimation from './FooterAnimation';
import HeaderNavAnimation from './HeaderNavAnimation'
import MouseCursorEffect from './MouseCursorEffect';
import ProductCompactment from './ProductCompactment';
import ProductDetailsAnimation from './ProductDetailsAnimation';
import Products from './ProductsAnimation';
import AppWebGLExperience from '../WebGL/appExperience';
import { AnimationPagesType } from './types';



export default class Animation {
    private static _instance: Animation | null;
    currentAnimationPage!: AnimationPagesType;
    previousAnimationPage!: AnimationPagesType;
    headerNav!: HeaderNavAnimation;
    products!: Products;
    mouseEffect!: MouseCursorEffect;
    productDetails!: ProductDetailsAnimation;
    footer!: FooterAnimation;
    productCompactment!: ProductCompactment;
    webGLExperience!: AppWebGLExperience;

    constructor() {
        if (Animation._instance instanceof Animation) {
            return Animation._instance;
        }
        this.previousAnimationPage = "None";
        this.currentAnimationPage = 'Product';
        // this.webGLExperience = new AppWebGLExperience(this);
        this.products = new Products(this);
        this.headerNav = new HeaderNavAnimation(this);
        this.footer = new FooterAnimation(this);
        this.productDetails = new ProductDetailsAnimation(this);
        this.productCompactment = new ProductCompactment(this);
        this.mouseEffect = new MouseCursorEffect(this);




        // create a singleton class
        Animation._instance = this


    }


    dispose() {
        // this.mouseEffect.dispose();
    }
}