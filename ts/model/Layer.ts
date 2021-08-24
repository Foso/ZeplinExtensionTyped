import Fill from "./Fill";
import Rect from "./Rect";
import TextStyleObject from "./TextStyleObject";

export default class Layer {
    name: string
    type: string
    content : string
    textStyles: Array<TextStyleObject>
    rect: Rect
    fills: Array<Fill>
}

