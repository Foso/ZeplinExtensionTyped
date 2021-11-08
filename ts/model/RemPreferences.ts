export default interface RemPreferences {
    /** Whether rem unit is used for font sizes. */
    useForFontSizes : Boolean

    /** Whether rem unit is used for measurements (e.g. width, height, etc.). */
    useForMeasurements : Boolean

    /** The value of the root element's font size. */
    rootFontSize : Number
}