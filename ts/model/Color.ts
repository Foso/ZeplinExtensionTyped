import HexColor from "./HexColor"

export default interface Color {

     name: string

    /**
     * Name of the color, only exists on project colors
     */
     originalName: string | null

    /**
     * Id of the color in the source design document.
     */
     sourceId: string

    /**
     * Red component of the color, [0, 255].
     */
     r: number

    /**
     * Green component of the color, [0, 255].
     */
     g: number

    /**
     * Blue component of the color, [0, 255].
     */
     b: number

    /**
     * Alpha component of the color, [0, 1].
     */
     a: number

     toHex() : HexColor
    
}
