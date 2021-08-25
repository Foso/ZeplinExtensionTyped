import Color from "./model/Color"
import Context from "./model/Context"
import HexColor from "./model/HexColor"
import Layer from "./model/Layer"
import Screen from "./model/Screen"
import Version from "./model/Version"
import CodeExportObject from "./model/CodeExportObject"
import CodeObject from "./model/CodeObject"



function handleShape(context: Context, layer: Layer): string {
  let height = layer.rect.height
  let width = layer.rect.width
  var colorValue = ""

  layer.fills.forEach((fill) => {
    let fillColor = fill.color
    let newCol = context.project.findColorEqual(fillColor!)
    colorValue = colorValue + newCol?.name
  })

  let shapeCode = `Box(modifier = Modifier 
    .height(${height}.dp) 
    .width(${width}.dp) 
    .background(${colorValue}) {}`

  let shadow = "\n\nShadow:" + layer.shadows.map((item) => {
    return `Shadow
    Blur: ${item.blurRadius} + ".dp"
    spread: ${item.spread} + ".dp"
    offsetY: ${item.offsetY} + ".dp"
    offsetX: ${item.offsetX} + ".dp"`


  })

  return "Shapi" + width + "  " + height + "   " + shapeCode + shadow
}


function handleText(context: Context, layer: Layer): string {
  let project = context.project

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


function layer(context: Context, layer: Layer): string | CodeObject {

  switch (layer.type) {
    case "text": {
      let text = handleText(context, layer)
      return new CodeObject(
        text,
        "kotlin")
    }
    case "shape": {
      return handleShape(context, layer)
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

function textStyles(context: Context): CodeObject {
  let names = context.project.textStyles.map((style) => {

    let findColor = context.project.findColorEqual(style.color)

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
  return selectedScreen.name;
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