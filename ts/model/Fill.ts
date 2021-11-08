import Color from "./Color"
import Gradient from "./Gradient"

export default class Fill {
    /** Type of the fill, color and gradient. */
    type: string

    /** Color of the fill. */
    color: Color | null

    /** Gradient of the fill. */
    gradient: Gradient | null

    /** Opacity of the fill, [0, 1]. */
    opacity: number


    fill: number


}