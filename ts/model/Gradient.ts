import ColorStop from "./ColorStop"

export default class Gradient {
     /**
      * Type of the gradient, linear, radial and angular.
      */
     type: String

     /**
      * Gradient line's angle of direction.
      */
     angle : number

     /**
      * Scale of the gradient.
      */
     scale : number

     /**
      * Color stops of the gradient.
      */
     colorStops : Array<ColorStop> | null

}