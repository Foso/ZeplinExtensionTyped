function handleText(context, layer) {
    const textStyle = context.project.findTextStyleEqual(layer.textStyles[0].textStyle);
    var tt = textStyle?.name.replaceAll("/", "").replaceAll(" ", "");
    var col = context.project.findColorEqual(textStyle.color);
    var styleValue = `fun ${tt}() = TextStyle(
          fontFamily = FontFamily(${textStyle?.fontFace}),
          lineHeight = ${textStyle?.lineHeight}.sp,
          fontSize = ${textStyle?.fontSize}.sp,
          letterSpacing = ${textStyle?.letterSpacing}.sp,
          color = Color(0xFF343638))\n\n`;
    var composableText = `Text(\"${layer.content}\",style = ${tt}())`;
    var text = col.name + styleValue + composableText;
    return text;
}
function layer(context, layer) {
    switch (layer.type) {
        case "text": {
            return handleText(context, layer);
        }
        case "shape": {
            let height = layer.rect.height;
            let width = layer.rect.width;
            var colorValue = "";
            layer.fills.forEach((fill) => {
                let fillColor = fill.color;
                let newCol = context.project.findColorEqual(fillColor);
                colorValue = colorValue + newCol?.name;
            });
            let shapeCode = `Box(modifier = Modifier 
        .height(${height}.dp) 
        .width(${width}.dp) 
        ${colorValue}) {}`;
            return "Shapi" + width + "  " + height + "   " + shapeCode;
        }
        case "group": {
            return "group " + layer.type;
        }
        default: {
            return "Default " + layer.type;
        }
    }
}
function screen(context, selectedVersion, selectedScreen) {
    return selectedScreen.name;
}
function colors(context) {
    var code2 = "// MARKi: - Color palette\n\n";
    const colors = contextColors(context);
    var colorsCode = "";
    colors.forEach((color) => {
        colorsCode = colorsCode + color.name + "\n";
    });
    code2 += colorsCode;
    return {
        code: code2,
        language: "xml"
    };
}
function exportColors(context) {
    var code2 = "// MARKi: - Color palette\n\n";
    const colors = contextColors(context);
    var colorsCode = "";
    colors.forEach((color) => {
        colorsCode = colorsCode + color.name + "\n";
    });
    code2 += colorsCode;
    return {
        code: code2,
        language: "xml",
        filename: "test.kt"
    };
}
function contextColors(context) {
    let allColors = [];
    if (context.styleguide === undefined) {
        allColors = allColors.concat(context.project.colors);
        if (context.project.linkedStyleguide !== undefined) {
            allColors = allColors.concat(context.project.linkedStyleguide.colors);
        }
    }
    else {
        allColors = allColors.concat(context.styleguide.colors);
    }
    return allColors;
}
export default { layer, screen, colors, exportColors };
