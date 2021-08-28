import  Project  from "./Project";
import Styleguide from "./Styleguide";

export default class Context { 
    project: Project | null
    styleguide : Styleguide| null
    getOption(name) : Number | Boolean | String{
        return ""
    }
}
