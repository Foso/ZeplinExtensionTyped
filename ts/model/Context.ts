import Project from "./Project";
import Styleguide from "./Styleguide";

export default class Context {
    /** Project that the extension is running in. */
    project: Project | null

    /** Styleguide that the extension is running in. */
    styleguide: Styleguide | null

    /** Value of the option with id. */
    getOption(name): Number | Boolean | String {
        return ""
    }
}
