import Color from "./Color"

export default class TextStyle { 
    name: string
    fontFamily: string
  lineHeight: number
  fontSize: number
  letterSpacing: number
  /**
   * Complete font name of the text style.
   */
  fontFace:string
  color: Color
}
