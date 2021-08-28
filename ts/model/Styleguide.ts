import Color from "./Color";
import TextStyleObject from "./TextStyleObject";

export default  class Styleguide {
    type: string;
    name: string;
    textStyles: Array<TextStyleObject>
    colors: Array<Color>
}
