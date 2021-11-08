import HexColor from "./HexColor"

export default interface Color {

     /** @deprecated Formatted name of the color, only exists on project colors. Please use Color.originalName and Color.getFormattedName instead. */
     name: string

     /**
      * Name of the color, only exists on project colors
      */
     originalName: string | null

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

     /**
     * Id of the color in the source design document.
     */
     sourceId: string

     /** Formats the original name according to the provided naming scheme. */
     getFormattedName(namingScheme: string): string

     /** Blends another color with this one, via alpha compositing. */
     blend(color: Color): Color

     /** Hex representation of the color. */
     toHex(): HexColor

}
