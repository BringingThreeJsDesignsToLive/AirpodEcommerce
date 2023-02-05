import { AnimateDirectionType, AnimationPagesType } from "../../gsapAnimations/types"

interface AnimateMethodProps {
    currentPage: AnimationPagesType,
    previousPage: AnimationPagesType,
    activeIndex: number,
    animateDirection: AnimateDirectionType
}

export {
    AnimateMethodProps
}