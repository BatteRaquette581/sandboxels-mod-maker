export default class {
    constructor(
        reacting_with,
        react_into,
        other_react_into,
    ) {
        this.reacting_with = reacting_with
        this.react_into = react_into
        this.other_react_into = other_react_into
    }

    to_string() {
        return `"${this.reacting_with}": { ${(this.react_into != "") ? ("elem1: " + ((this.react_into == "null") ? (this.react_into) : ('"' + this.react_into + '"')) + ",") : ""} ${(this.other_react_into != "") ? ("elem2: " + ((this.other_react_into == "null") ? (this.other_react_into) : ('"' + this.other_react_into + '"'))) : ""} },`
    }
}
