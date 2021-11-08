import Color from "./Color";

export default interface Shadow {
     /** Type of the shadow, outer or inner. */
     type: string

     /** Horizontal offset of the shadow. */
     offsetX: string

     /** Vertical offset of the shadow. */
     offsetY: string

     /** Radius of the blur applied to the shadow, a positive integer. */
     blurRadius: number

     /** Spread of the shadow. */
     spread: number

     /** Color of the shadow. */
     color : Color
}