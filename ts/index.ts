import Color from "./model/Color"
import Context from "./model/Context"
import HexColor from "./model/HexColor"
import Layer from "./model/Layer"
import Screen from "./model/Screen"
import Version from "./model/Version"
import Image from "./model/Image"

import CodeExportObject from "./model/CodeExportObject"
import CodeObject from "./model/CodeObject"
import Shadow from "./model/Shadow"
import Rect from "./model/Rect"
import Fill from "./model/Fill"
import Gradient from "./model/Gradient"
import ColorStop from "./model/ColorStop"
import Layout from "./model/Layout"
import Project from "./model/Project"
import TextStyle from "./model/TextStyle"
import TextStyleObject from "./model/TextStyleObject"

function showit(context: Context, layer: Layer): string {
  let height = layer.rect.height
  let width = layer.rect.width
  switch (layer.type) {
    case "text": {
      let project = context.project!

      const textStyle = layer.textStyles[0].textStyle

      var textStyleName = project.findTextStyleEqual(layer.textStyles[0].textStyle)?.name.replaceAll("/", "").replaceAll(" ", "")
    
      var colorValue: string = "LEER"
      if (textStyle != null) {
        let findColor = project.findColorEqual(textStyle.color)
    
        if (findColor != null) {
          colorValue = findColor.name.replaceAll("-", "_")
        } else {
          let hex = layer.textStyles[0].textStyle.color.toHex()
          colorValue = "0xFF" + hex.r + hex.g + hex.b
        }
      } else {
        colorValue = layer.textStyles[0].textStyle.color.toHex().toString()
      }
    
      var styleValue = `fun ${textStyleName}() = TextStyle(
              fontFamily = FontFamily(${textStyle?.fontFace}),
              lineHeight = ${textStyle?.lineHeight}.sp,
              fontSize = ${textStyle?.fontSize}.sp,
              letterSpacing = ${layer.textStyles[0].textStyle?.letterSpacing}.sp,
              color = Color(${colorValue}))\n\n`




      var textValue = `Text(\"${layer.content}\",style = ${textStyleName}())`



      if (layer.parent.type == "group" && layer.parent.name == "but_primary") {
        return "PrimaryButton(onClick={}){" + textValue + "}" + "\n\n"
      } else if (layer.parent.type == "group" && layer.parent.name == "But_secondary_small_white") {
        return "PrimaryTinyButton(" + textValue + ")" + "\n\n"
      } else if (layer.parent.type == "group" && layer.parent.name == "but_secondary") {
        return "SecButton(" + textValue + ")" + "\n\n"
      }
      else {
        return textValue + "\n\n"
      }

      return ""

    }
    case "shape": {


      switch (layer.name) {
        case "Rectangle": {
          let shapeCode = `Box(modifier = Modifier 
        .height(${height}.dp) 
        .width(${width}.dp) 
        .background()) {}`
          return layer.name + " " + shapeCode + "\n"
        }

        default:
          return ""
      }



    }
    case "group": {

      if (isComponent(layer)) {

        return `Icon(R.drawable.${iconName(layer.name)},modifier = Modifier 
        .height(${height}.dp) 
        .width(${width}.dp) )\n\n`
      }

      return layer.type + " " + layer.name + "a\n"
    }
  }
  return ""
}


function show(context: Context, num: number, layer: Layer): string {

  var ident = ee(num)

  if (layer.layers.length == 0) {
    return ident + showit(context, layer)
  }
  else {

    switch (layer.type) {
      case "shape": {
        let tt = layer.layers.map((layer) => {
          return show(context, 0, layer)
        })

        return ident + "Shape: " + layer.name + "\n" + tt.join("") + "\n"
      }

      case "group": {
        var compo = ""
        if (isComponent(layer)) {
          return showit(context, layer)
        }

        let tt = layer.layers.map((layer) => {
          return show(context, num + 1, layer)
        })

        return ident + "Group: " + layer.name + " " + compo + "\n" + tt.join("") + "\n"
      }
    }


    return "Default" + layer.type
  }
}

function isIcon(layer: Layer): boolean {
  return (layer.assets.length > 0) && ((layer.componentName ?? "").length > 0)
}

function isButton(layer: Layer): boolean {
  return (layer.type == "shape" && layer.name.indexOf("Rectangle") > -1)
}

function isPrimaryButton(layer: Layer): boolean {
  let names = new Array("but_primary")
  return (layer.type == "group" && names.includes(layer.name))
}

function isSecondaryButton(layer: Layer): boolean {
  return (layer.type == "group" && layer.name.indexOf("but_secondary") > -1)
}

function iconName(name: string): string {
  return name.replaceAll("/", "_").toLowerCase()
}



function layer(context: Context, layer: Layer): string | CodeObject {




  //return layer.componentName?.length.toString() ?? "HHHHH"
  if (isIcon(layer)) {

    // return `Icon{R.drawable.${iconName(layer.name)}}`
  }
  if (isButton(layer)) {
    // return layer.layers.length.toString()
  }

  let shape =  printLayer(layer)//layer.componentName+"SHAPE \n"+handleShape(context, layer)
  return new CodeObject(shape, "kotlin")


  switch (layer.type) {
    case "text": {
      let text = handleText(context, layer)
      return new CodeObject(
        text,
        "kotlin")
    }
    case "shape": {
      let shape = printLayer(layer)//layer.componentName+"SHAPE \n"+handleShape(context, layer)
      return new CodeObject(
        shape,
        "kotlin")
    }

    case "group": {
      let assets = layer.assets.map((asset) => {
        return asset.format
      })
      return "group " + layer.type + "  " + layer.layers[0].layers[0].name
    }
    default: {
      return "Default " + layer.type
    }
  }
}


function handleShape(project: Project, layer: Layer): string {
  let height = layer.rect.height
  let width = layer.rect.width
  var colorValue = ""

  layer.fills.forEach((fill) => {

    let fillColor = fill.color
    let newCol = project.findColorEqual(fillColor!)
    colorValue = colorValue + newCol?.name
  })

  let shapeCode = `Box(modifier = Modifier 
    .height(${height}.dp) 
    .width(${width}.dp) 
    .background(${colorValue})) {}`

  let shadow = "\n\nShadow:" + layer.shadows.map((item) => {
    return `Shadow
    Blur: ${item.blurRadius} + ".dp"
    spread: ${item.spread} + ".dp"
    offsetY: ${item.offsetY} + ".dp"
    offsetX: ${item.offsetX} + ".dp"`


  })

  return shapeCode + shadow
}


function printLayer(layer: Layer): string {

  var code11 = ""
  code11 = code11 + "Layer" + "\n"
  code11 = code11 + "name :" + layer.name + "\n"
  code11 = code11 + "type :" + layer.type + "\n"
  code11 = code11 + "opacity :" + layer.opacity + "\n"
  code11 = code11 + "rect :" + printRect(layer.rect) + "\n"
  code11 = code11 + "parentName :" + layer.parent.name + "\n"
  code11 = code11 + "parentType :" + layer.parent.type + "\n"
  code11 = code11 + "parent is Button :" + isPrimaryButton(layer.parent) + "\n"
  code11 = code11 + "parent is Sec Button :" + isSecondaryButton(layer.parent) + "\n"
  code11 = code11 + "textStyles :\n" + layer.textStyles.map((shadow) => {
    return printTextStyleObject(shadow)
  }) + "\n"
  code11 = code11 + "rotation :" + layer.rotation + "\n"
  code11 = code11 + "Shadows :\n" + layer.shadows.map((shadow) => {
    return printShadow(shadow)
  }) + "\n"

  //code11 = code11 + "version :" + printVersion(layer.version) + "\n"
  code11 = code11 + "borderrad :" + layer.borderRadius + "\n"
  code11 = code11 + "borders :" + layer.borders.map((item) => {
    return item.position
  }) + "\n"
  code11 = code11 + "fills :\n"
  code11 = code11 + "fill :" + layer.fills.map((item) => {
    return "FILL:" + printFill(item)
  })
  code11 = code11 + "layout :" + printLayout(layer.layout) + "\n"

  code11 = code11 + layer.layers.map((item) => {
    return "Layer:" + printLayer(item)
  })


  return code11
}

function printTextStyleObject(textStyle:TextStyleObject):string{

  var code11 = "TextStyleObject"
  code11 = code11 + "texttstyle :" + printTextStyle(textStyle.textStyle)

  return code11
}

function printTextStyle(textStyle:TextStyle):string{
  var code11 = "Textstyle"
  code11 = code11 + "fontFamily :" + textStyle.fontFamily + "\n"
  code11 = code11 + "fontSize :" + textStyle.fontSize.toString() + "\n"


  return code11
}


function printFill(fill: Fill): string {
  var code11 = "Fill"
  code11 = code11 + "opacity :" + fill.opacity + "\n"

  code11 = code11 + printGradient(fill.gradient) + "\n"

  return code11
}

function printGradient(gradient: Gradient | null): string {
  var code11 = "Gradient\n"
  if (gradient != null) {

    code11 = code11 + "angle :" + gradient.angle + "\n"
    code11 = code11 + "scale :" + gradient.scale + "\n"
    code11 = code11 + "type :" + gradient.type + "\n"
    code11 = code11 + gradient.colorStops?.map((item) => {
      return printColorStop(item)
    })

  }

  return code11
}



function printLayout(layout: Layout | null): string {
  var code11 = "Layout\n"
  if (layout != null) {
    code11 = code11 + "direction:" + layout.direction + "\n"

    code11 = code11 + "alignment :" + layout.alignment + "\n"


  }

  return code11
}

function printColorStop(colorStop: ColorStop | null): string {
  var code11 = "colorStop\n"
  if (colorStop != null) {

    code11 = code11 + "position :" + colorStop.position + "\n"
    code11 = code11 + "color :" + printColor(colorStop.color) + "\n"


  }

  return code11
}

function printColor(color: Color | null): string {
  var code11 = "color:\n"
  if (color != null) {

    code11 = code11 + "name :" + color.name + "\n"
    code11 = code11 + "r :" + color.r + "\n"
    code11 = code11 + "g :" + color.g + "\n"
    code11 = code11 + "b :" + color.b + "\n"
    code11 = code11 + "a :" + color.a + "\n"

  }

  return code11
}

function printRect(rect: Rect): string {
  var code11 = ""
  code11 = code11 + "height :" + rect.height + "\n"
  code11 = code11 + "width :" + rect.width + "\n"
  code11 = code11 + "x :" + rect.x + "\n"
  code11 = code11 + "y :" + rect.y + "\n"


  return code11
}


function printShadow(shadow: Shadow | null): string {
  var code11 = ""
  if (shadow != null) {
    code11 = code11 + "blurRadius " + shadow.blurRadius + "\n"
    code11 = code11 + "color " + printColor(shadow.color) + "\n"
    code11 = code11 + "offsetX " + shadow.offsetX + "\n"
    code11 = code11 + "offsetY " + shadow.offsetY + "\n"
    code11 = code11 + "spread " + shadow.spread + "\n"
  }

  return code11
}


function printVersion(version: Version): string {
  var code11 = ""
  code11 = code11 + "//Version" + "\n"
  code11 = code11 + "componentNames :" + version.componentNames + "\n"
  code11 = code11 + printImage(version.image) + "\n"
  code11 = code11 + "Grid :" + version.grid + "\n"
  code11 = code11 + "backgroundColor :" + printColor(version.backgroundColor) + "\n"

  return code11
}

function printImage(image: Image): string {
  var code11 = ""

  code11 = code11 + "//Image" + "\n"
  code11 = code11 + "height :" + image.height + "\n"
  code11 = code11 + "width :" + image.width + "\n"
  code11 = code11 + "url :" + image.url + "\n"

  return code11
}


function handleText(context: Context, layer: Layer): string {
  let project = context.project
  if (project == null) return ""
  const textStyle = layer.textStyles[0].textStyle

  var textStyleName = project.findTextStyleEqual(layer.textStyles[0].textStyle)?.name.replaceAll("/", "").replaceAll(" ", "")

  var colorValue: string = "LEER"
  if (textStyle != null) {
    let findColor = project.findColorEqual(textStyle.color)

    if (findColor != null) {
      colorValue = findColor.name.replaceAll("-", "_")
    } else {
      let hex = layer.textStyles[0].textStyle.color.toHex()
      colorValue = "0xFF" + hex.r + hex.g + hex.b
    }
  } else {
    colorValue = layer.textStyles[0].textStyle.color.toHex().toString()
  }

  var styleValue = `fun ${textStyleName}() = TextStyle(
          fontFamily = FontFamily(${textStyle?.fontFace}),
          lineHeight = ${textStyle?.lineHeight}.sp,
          fontSize = ${textStyle?.fontSize}.sp,
          letterSpacing = ${layer.textStyles[0].textStyle?.letterSpacing}.sp,
          color = Color(${colorValue}))\n\n`

  var composableText = `Text(\"${layer.content}\",style = ${textStyleName}())`
  var text = styleValue + composableText
  return text
}




function textStyles(project: Project): CodeObject {
  let names = project.textStyles.map((style) => {

    let findColor = project.findColorEqual(style.color)

    return `\nval ${style.name} = TextStyle(
      fontFamily = FontFamily(${style?.fontFace}),
      lineHeight = ${style?.lineHeight}.sp,
      fontSize = ${style?.fontSize}.sp,
      letterSpacing = ${style?.letterSpacing}.sp,
      color = Color(${findColor?.name}))\n\n`
  })
  return new CodeObject(
    names.join(""),
    "kotlin")
}

function screen(context: Context, selectedVersion: Version, selectedScreen: Screen) {

  var tt = selectedVersion.layers.map((layer) => {
    return show(context, 0, layer)
  })

  return new CodeObject(
    tt.join(""),
    "kotlin")
}

function ee(num: number): string {
  var text = ""
  for (var _i = 0; _i < num; _i++) {
    text = text + " "
  }

  return text
}



function isComponent(layer: Layer): boolean {
  return ((layer.componentName ?? "").length > 0) && (layer.assets.length > 0)
}

function cleanNameForAndroid(name: string): string {
  return name.replaceAll("-", "")
}

function colors(context: Context) {
  var code2 = "// MARK i: - Color palette\n\n";
  const colors = contextColors(context);

  var colorsCode = "";

  colors.forEach((color) => {
    let hexColor = color.toHex()
    let colorName = cleanNameForAndroid(color.originalName ? color.originalName : color.name)
    colorsCode = colorsCode + "val " + colorName + " = Color(0xFF" + toHexString(hexColor) + ")\n"
  })

  code2 += colorsCode

  return new CodeObject(
    code2,
    "kotlin")


}

function toHexString(hexColor: HexColor): string {
  return "" + hexColor.r + hexColor.g + hexColor.b
}
function exportColors(context: Context) {
  var code2 = "// MARKi: - Color palette\n\n";
  const colors = contextColors(context);

  var colorsCode = "";

  colors.forEach((color) => {
    colorsCode = colorsCode + color.name + " " + color.toHex().r + "\n"
  })

  code2 += colorsCode

  return new CodeExportObject(
    code2,
    "xml",
    "test2.kt"
  )
}

function contextColors(context): Array<Color> {
  let allColors = [];
  if (context.styleguide === undefined) {
    allColors = allColors.concat(context.project.colors);
    if (context.project.linkedStyleguide !== undefined) {
      allColors = allColors.concat(context.project.linkedStyleguide.colors);
    }
  } else {
    allColors = allColors.concat(context.styleguide.colors);
  }
  return allColors;
}

export default { layer, screen, colors, exportColors, textStyles }