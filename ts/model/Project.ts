import Color from "./Color";
import TextStyle from "./TextStyle";

export default  class Project {
    name: string;
    type: string;

    findTextStyleEqual(textStyle: TextStyle, useParentStyleguides: Boolean  = true): TextStyle | null{ return null}
    findColorEqual(color:Color, useParentStyleguides: Boolean = true ): Color | null{ return null }

}
