import SpacingToken from "./SpacingToken";

export default interface SpacingSection {
    /** Name of the spacing section. */
    name : string

    /** Description of the spacing section. */
    description : string

    /** Base token of the sections. */
    baseToken : SpacingToken

    /** Spacing tokens in the sections. */
    spacingTokens : Array<SpacingToken>

}
