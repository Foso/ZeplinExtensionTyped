export default class Color {

     name: String

    /**
     * Name of the color, only exists on project colors
     */
     originalName: String | null

    /**
     * Id of the color in the source design document.
     */
     sourceId: String

    /**
     * Red component of the color, [0, 255].
     */
     r: Double

    /**
     * Green component of the color, [0, 255].
     */
     g: Double

    /**
     * Blue component of the color, [0, 255].
     */
     b: Double

    /**
     * Alpha component of the color, [0, 1].
     */
     a: Double


    
}

type Double = number
