import Color from "./Color"
import Layer from "./Layer"
import Image from "./Image"
import Grid from "./Grid"

export default class Version {
     source : string
     image: Image
     backgroundColor : Color
     layers : Array<Layer>
     links : Array<Object>
     grid : Grid
     componentNames: Array<string>
}