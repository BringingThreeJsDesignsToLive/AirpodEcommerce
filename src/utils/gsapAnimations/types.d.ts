
type AnimationPagesType = 'Product' | 'ProductDetails' | 'Compactments' | "None"

type AnimateDirectionType = 'Forward' | 'Backward' | 'None' | 'Highlight' | 'Hide' | 'Default'

interface getIndexNumberReturnType {
    index: number;
    animateDirection: AnimateDirectionType;
}


export {
    AnimationPagesType,
    AnimateDirectionType,
    getIndexNumberReturnType
}