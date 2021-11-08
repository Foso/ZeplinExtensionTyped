/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */

import Context from "./model/Context";
import Layer from "./model/Layer";
import Version from "./model/Version";
import Screen from "./model/Screen";
import CodeObject from "./model/CodeObject";
import Component from "./model/Component";

/** Generates string or code object from the selected layer. */
function layer(context: Context, layer: Layer): string | CodeObject {
  return `Hello ${layer.name}.`;
};




function screen(context: Context, selectedVersion: Version, selectedScreen: Screen): string | CodeObject {
  return "HALLO"
}

function component(context: Context, selectedVersion: Version, selectedComponent: Component): string | CodeObject {
  return selectedComponent.name
}

function colors(context: Context) {

}

function textStyles(context: Context) {

}

function spacing(context: Context) {

}

function exportColors(context: Context) {

}

function exportTextStyles(context: Context) {

}

function exportSpacing(context: Context) {

}

/**
* The following functions will be deprecated. Your extensions can export them to support old versions of Zeplin's macOS app.
* See Zeplin Extensions migration guide for details:
* https://zpl.io/shared-styleguides-extensions-migration-guide
*/

function styleguideColors(context: Context, colors) {

}

function styleguideTextStyles(context: Context, textStyles) {

}

function exportStyleguideColors(context: Context, colors) {

}

function exportStyleguideTextStyles(context: Context, textStyles) {

}

function comment(context: Context, text) {

}

export default {
  layer,
  screen,
  component,
  colors,
  textStyles,
  spacing,
  exportColors,
  exportTextStyles,
  exportSpacing,
  styleguideColors,
  styleguideTextStyles,
  exportStyleguideColors,
  exportStyleguideTextStyles,
  comment
};
