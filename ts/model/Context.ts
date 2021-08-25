import  Project  from "./Project";
import Styleguide from "./Styleguide";

export default class Context { 
    project: Project
    styleguide : Styleguide
    getOption(name) : Number | Boolean | String{
        return ""
    }
}
