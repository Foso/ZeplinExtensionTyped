import Color from "./Color"
import Gradient from "./Gradient"

export default class Fill {
    type: String
    color: Color | null
    gradient: Gradient | null
    opacity: number
    fill: number
}