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
    type: string
    name: string
    sourceId: string
    rect: Rect
    layout: Layout
    fills: Array<Fill>
    borders: Array<Border>
    content: string
    textStyles: Array<TextStyleObject>
    shadows: Array<Shadow>
    parent: Layer
    version: Version
    blur: Blur
    opacity: number
    //val blendMode: dynamic
    borderRadius: number
    rotation: number
    assets: Array<Asset>
    /**
     * Child layers of the group layer.
     */
    layers: Array<Layer>
    componentName: string | null
}

