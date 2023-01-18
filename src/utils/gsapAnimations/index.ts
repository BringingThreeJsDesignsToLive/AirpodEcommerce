import FooterAnimation from './FooterAnimation';
import HeaderNavAnimation from './HeaderNavAnimation'
import MouseCursorEffect from './MouseCursorEffect';
import ProductDetailsAnimation from './ProductDetailsAnimation';
import Products from './ProductsAnimation';


export default class Animation {
    private static _instance: Animation | null;
    currentAnimationPage!: 'Product' | 'ProductDetails' | 'Compactments'
    headerNav!: HeaderNavAnimation;
    products!: Products;
    mouseEffect!: MouseCursorEffect;
    productDetails!: ProductDetailsAnimation;
    footer!: FooterAnimation;

    constructor() {
        if (Animation._instance instanceof Animation) {
            return Animation._instance;
        }
        this.currentAnimationPage = 'Product';
        this.products = new Products(this);
        this.headerNav = new HeaderNavAnimation(this);
        this.footer = new FooterAnimation(this);
        this.productDetails = new ProductDetailsAnimation(this)
        this.mouseEffect = new MouseCursorEffect(this);



        // create a singleton class
        Animation._instance = this


    }


    dispose() {
        // this.mouseEffect.dispose();
    }
}