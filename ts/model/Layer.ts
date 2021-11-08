import Blur from "./Blur";
import Fill from "./Fill";
import Layout from "./Layout";
import Rect from "./Rect";
import Border from "./Border";
import Shadow from "./Shadow";
import TextStyleObject from "./TextStyleObject";
import Asset from "./Asset";
import Version from "./Version";

export default interface Layer {

    /** Type of the layer, text, shape or group. */
    type: string

    /** Name of the layer. */
    name: string

    /** Id of the layer in the source design document. */
    sourceId: string

    /** Bounding rectangle of the layer. */
    rect: Rect

    /** Layout properties of the layer. */
    layout: Layout

    /** Fills applied to the layer. */
    fills: Array<Fill>

    /** Borders of the layer. */
    borders: Array<Border>

    /** Shadows applied to the layer. */
    shadows: Array<Shadow>

    /** Blur applied to the layer. */
    blur: Blur

    /** Opacity of the layer, [0, 1]. */
    opacity: number

    /** Blend mode of the layer, defined in Fill.BLEND_MODES. */
    //val blendMode: dynamic

    /** Border radius of the layer. */
    borderRadius: number

    /** Rotation of to the layer. */
    rotation: number

    /** Indicates whether the layer has assets or not. */
    exportable: Boolean

    /** Assets of the layer. */
    assets: Array<Asset>

    /** Parent layer of the layer. */
    parent: Layer

    /** Version of the screen or component containing the layer. */
    version: Version

    /** Text of the text layer. */
    content: string

    /** Text styles of the text layer, with ranges. */
    textStyles: Array<TextStyleObject>

    /**
     * Child layers of the group layer.
     */
    layers: Array<Layer>

    /** Name of the component the group layer is referencing. */
    componentName: string | null

    /** Whether the layer is inspectable in Zeplin. */
    inspectable: Boolean


}

