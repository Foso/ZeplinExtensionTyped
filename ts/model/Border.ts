import Fill from "./Fill";

export default interface Border {
    /** Position of the border, center, inside or outside. */
    position: string

    /** Thickness of the border, a positive integer. */
    thickness: number

    /** Fill of the border. */
    fill: Fill
}