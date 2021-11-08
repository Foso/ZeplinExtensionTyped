import Component from "./Component"
import ComponentPropertyDescriptor from "./ComponentPropertyDescriptor"

export default class ComponentVariant {
    /** Name of the component variants. */
    name: string

    /** Details of the properties that components in this variant can take. */
    propertyDescriptors: Array<ComponentPropertyDescriptor>

    /** Components included in the variant. */
    components: Array<Component>

    /** Finds property descriptor by unique identifier. */
    findPropertyDescriptorById(propertyId: string): ComponentPropertyDescriptor | null {
        return null
    }

    /** Finds property descriptor by name. */
    findPropertyDescriptorByName(name: string): ComponentPropertyDescriptor | null {
        return null
    }
}