import ComponentProperty from "./ComponentProperty"
import ComponentVariant from "./ComponentVariant"
import Version from "./Version"

export default class Component {

    /** Name of the component. */
    name: string

    /** Description of the component. */
    description: string

    /** Latest version of the component. */
    latestVersion: Version

    /** Variant properties of the component. */
    properties: Array<ComponentProperty>

    /** Variant that the component is part of. */
    variant: ComponentVariant

    /** Finds property by unique identifier. */
    findPropertyById(propertyId: string): ComponentProperty | null {
        return null
    }

    /** Finds property by name. */
    findPropertyByName(name: string): ComponentProperty | null {
        return null
    }
}