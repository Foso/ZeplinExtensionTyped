import Padding from "./Padding";

export default interface Layout {
    /**
     * Determines how the children of the layer are laid out in this layer:
     * "row": The children are placed on a line horizontally
     * "column": The children are stacked vertically
     */
    direction: Direction

    /** Padding between the borders of the layer and its children. */
    padding: Padding

    /** Distance between children of the layer. */
    gap: number

    /** Determines if the layer has fixed or automatic length for its axis which is orthogonal to its layout direction, i.e., its width if Layer.direction is "column" or its height if Layer.direction is "row". */
    sizingMode: string

    /** Determines how the children are aligned inside the layer. */
    alignment: Alignment


}