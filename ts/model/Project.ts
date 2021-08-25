import Color from "./Color";
import Styleguide from "./Styleguide";
import TextStyle from "./TextStyle";

export default  class Project {
    name: string;
    type: string;
    textStyles: Array<TextStyle>
    colors: Array<Color>
    linkedStyleguide : Styleguide | null
    findTextStyleEqual(textStyle: TextStyle, useParentStyleguides: Boolean  = true): TextStyle | null{ return null}
    findColorEqual(color:Color, useParentStyleguides: Boolean = true ): Color | null{ return null }

}
