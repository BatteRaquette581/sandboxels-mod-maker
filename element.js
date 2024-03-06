import Reaction from "./reaction.js"

export default class {
    constructor(
        name,
        colour,
        behaviour,
        category,
        state,
        melting_point,
        melting_turn_into,
        freezing_point,
        freezing_turn_into,
        density,
        hidden,
        hardness,
        broken_turn_into,
        burning_likelihood,
        burn_time,
        burning_turn_into,
        reactions,
    ) {
        this.name = name
        this.colour = colour
        this.behaviour = behaviour
        this.category = category
        this.state = state
        this.melting_point = melting_point
        this.melting_turn_into = melting_turn_into
        this.freezing_point = freezing_point
        this.freezing_turn_into = freezing_turn_into
        this.density = density
        this.hidden = hidden
        this.hardness = hardness
        this.broken_turn_into = broken_turn_into
        this.burning_likelihood = burning_likelihood
        this.burn_time = burn_time
        this.burning_turn_into = burning_turn_into
        this.reactions = reactions
    }

    to_string() {
        const isValidName = /^[a-zA-Z0-9_ ]+$/
        if (!isValidName.test(this.name)) { // make sure it's a valid name
            alert("Invalid name: " + this.name)
            return "ERROR: Invalid name: " + this.name
        }
        let raw_element_name = this.name.toLowerCase().split(" ").join("_")
        console.log(this.reactions)
        return `elements.${raw_element_name} = {
    color: "${this.colour}",
    behavior: ${this.behaviour},
    category: "${this.category.toLowerCase()}",
    state: "${this.state.toLowerCase()}",
    ${this.melting_point != "" ? "tempHigh: " + this.melting_point + "," : ""}
    ${this.melting_turn_into != "" ? "stateHigh: \"" + this.melting_turn_into + "\"," : ""}
    ${this.freezing_point != "" ? "tempLow: " + this.freezing_point + "," : ""}
    ${this.freezing_turn_into != "" ? "stateLow: \"" + this.freezing_turn_into + "\"," : ""}
    ${this.density != "" ? "density: " + this.density + "," : ""}
    ${this.hidden != "" ? "hidden: " + this.hidden + "," : ""}
    ${this.hardness != "" ? "hardness: " + this.hardness + "," : ""}
    ${this.broken_turn_into != "" ? "breakInto: \"" + this.broken_turn_into + "\"," : ""}
    ${this.burning_likelihood != "" ? "burn: " + this.burning_likelihood + "," : ""}
    ${this.burn_time != "" ? "burnTime: " + this.burn_time + "," : ""}
    ${this.burning_turn_into != "" ? "burnInto: \"" + this.burning_turn_into + "\"," : ""}
    ${this.reactions != [] ? "reactions: {" : ""}
    ${this.reactions != [] ? this.reactions.map(reaction => "    " + reaction.to_string()).join("\n") : ""}
    ${this.reactions != [] ? "}" : ""}
}`
    }
}
