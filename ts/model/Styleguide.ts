import Color from "./Color";
import RemPreferences from "./RemPreferences";
import SpacingSection from "./SpacingSection";
import SpacingToken from "./SpacingToken";
import TextStyle from "./TextStyle";
import TextStyleObject from "./TextStyleObject";

export default  class Styleguide {
   /** Type of the project, web, android, ios or osx. */
   type: string

   /** Name of the project. */
   name: string

   /** Text styles in the project. */
   textStyles: Array<TextStyle>

   /** Colors in the project. */
   colors: Array<Color>

   /** Spacing sections in the project. */
   spacingSections: Array<SpacingSection>

   /** Pixel density of the project. */
   density: string

   /** Divisor corresponding to the density, used to obtain actual values from unit values. */
   densityDivisor: Number

   /** Length unit of the project, based on the type, e.g. px for Web, pt for iOS. */
   lengthUnit: string

   /** Text length unit of the project, based on the type, e.g. dp for Android. */
   textLengthUnit: string

   /** Styleguide linked to the project. */
   linkedStyleguide: Styleguide | null

   /** rem preferences of the project (web projects only). This property exists only if rem is enabled for the project. */
   remPreferences: RemPreferences | null

   /** Finds text style in the project or in the linked styleguides (if useLinkedStyleguides is true) by name. */
   findTextStyleByName(name: string, useLinkedStyleguides: Boolean = true): TextStyle | null { return null }

   /** Finds text style in the project or in the linked styleguides (if useLinkedStyleguides is true) equal to another text style. */
   findTextStyleEqual(textStyle: TextStyle, useParentStyleguides: Boolean = true): TextStyle | null { return null }

   /** Finds color in the project or in the linked styleguides (if useLinkedStyleguides is true) by name. */
   findColorByName(name: string, useLinkedStyleguides: Boolean = true): Color | null { return null }

   /** Finds color in the project or in the linked styleguides (if useLinkedStyleguides is true) equal to another color. */
   findColorEqual(color: Color, useParentStyleguides: Boolean = true): Color | null { return null }

   /** Finds color in the project or in the linked styleguides (if useLinkedStyleguides is true) by hex and alpha values. */
   findColorByHexAndAlpha(values, useLinkedStyleguides: Boolean = true): Color | null { return null }

   /** Finds spacing token in the project or in the linked styleguides (if useLinkedStyleguides is true) by value. */
   findSpacingTokenByValue(value, useLinkedStyleguides: Boolean = true): SpacingToken | null { return null }

   /** Finds spacing token in the project or in the linked styleguides (if useLinkedStyleguides is true) by name. */
   findSpacingTokenByName(name: string, useLinkedStyleguides: Boolean = true): SpacingToken | null { return null }
}
