import Element from "./element.js"
import Reaction from "./reaction.js"

let i = 0
const create_new_element = () => {
    i++
    return new Element("Element " + i, "#000000", "behaviors.POWDER", "Land", "Solid", "", "", "", "", "", "", "", "", "", "", "", [])
}
let current_element = create_new_element()
let elements = [current_element]

// replace the pre element text with the generated code
const generate_button = document.getElementById("generate")
const code_pre = document.getElementById("code")
generate_button.onclick = () => code_pre.innerText = elements.map(element => element.to_string()).join("\n\n")

// element selector
const element_selector = document.getElementById("element_selector")
const update_element_selector = () => {
    let options = []
    let selected = element_selector.value
    elements.forEach(element => options.push(`<option>${element.name}</option>`))
    element_selector.innerHTML = options.join("\n")
    element_selector.value = selected
}
update_element_selector()

// update element properties
const name_input = document.getElementById("name")
name_input.defaultValue = "Element 1"
name_input.addEventListener("input", () => {
    let selected_index = element_selector.selectedIndex
    current_element.name = name_input.value
    update_element_selector()
    element_selector.selectedIndex = selected_index
})
const colour_input = document.getElementById("colour")
colour_input.addEventListener("input", () => current_element.colour = colour_input.value)
const behaviour_input = document.getElementById("behaviour")
behaviour_input.addEventListener("input", () => current_element.behaviour = behaviour_input.value)
const category_input = document.getElementById("category")
category_input.addEventListener("input", () => current_element.category = category_input.value.toLowerCase())
const state_input = document.getElementById("state")
state_input.addEventListener("input", () => current_element.state = state_input.value.toLowerCase())
const melting_point_input = document.getElementById("melting_point")
melting_point_input.addEventListener("input", () => current_element.melting_point = melting_point_input.value)
const melting_turn_into_input = document.getElementById("melting_turn_into")
melting_turn_into_input.addEventListener("input", () => current_element.melting_turn_into = melting_turn_into_input.value)
const freezing_point_input = document.getElementById("freezing_point")
freezing_point_input.addEventListener("input", () => current_element.freezing_point = freezing_point_input.value)
const freezing_turn_into_input = document.getElementById("freezing_turn_into")
freezing_turn_into_input.addEventListener("input", () => current_element.freezing_turn_into = freezing_turn_into_input.value)
const density_input = document.getElementById("density")
density_input.addEventListener("input", () => current_element.density = density_input.value)
const hidden_input = document.getElementById("hidden")
hidden_input.addEventListener("input", () => current_element.hidden = (hidden_input.value === "on" ? "true" : "false"))
const hardness_input = document.getElementById("hardness")
hardness_input.addEventListener("input", () => current_element.hardness = hardness_input.value)
const broken_turn_into_input = document.getElementById("broken_turn_into")
broken_turn_into_input.addEventListener("input", () => current_element.broken_turn_into = broken_turn_into_input.value)
const burning_likelihood_input = document.getElementById("burning_likelihood")
burning_likelihood_input.addEventListener("input", () => current_element.burning_likelihood = burning_likelihood_input.value)
const burn_time_input = document.getElementById("burn_time")
burn_time_input.addEventListener("input", () => current_element.burn_time = burn_time_input.value)
const burning_turn_into_input = document.getElementById("burning_turn_into")
burning_turn_into_input.addEventListener("input", () => current_element.burning_turn_into = burning_turn_into_input.value)

// change elements
const change_elements = () => {
    // save changes
    current_element.name = name_input.value
    current_element.colour = colour_input.value
    current_element.behaviour = behaviour_input.value
    current_element.category = category_input.value
    current_element.state = state_input.value
    current_element.melting_point = melting_point_input.value
    current_element.melting_turn_into = melting_turn_into_input.value
    current_element.freezing_point = freezing_point_input.value
    current_element.freezing_turn_into = freezing_turn_into_input.value
    current_element.density = density_input.value
    current_element.hidden = (hidden_input.value === "on" ? "true" : "false")
    current_element.hardness = hardness_input.value
    current_element.broken_turn_into = broken_turn_into_input.value
    current_element.burning_likelihood = burning_likelihood_input.value
    current_element.burn_time = burn_time_input.value
    current_element.burning_turn_into = burning_turn_into_input.value
    update_reactions()

    // overwrite to new element properties
    current_element = elements.filter(element => element.name === element_selector.value)[0]
    name_input.value = current_element.name
    colour_input.value = current_element.colour
    behaviour_input.value = current_element.behaviour
    category_input.value = current_element.category
    state_input.value = current_element.state
    melting_point_input.value = current_element.melting_point
    melting_turn_into_input.value = current_element.melting_turn_into
    freezing_point_input.value = current_element.freezing_point
    freezing_turn_into_input.value = current_element.freezing_turn_into
    density_input.value = current_element.density
    hidden_input.value = current_element.hidden === "true" ? "on" : "off"
    hardness_input.value = current_element.hardness
    broken_turn_into_input.value = current_element.broken_turn_into
    burning_likelihood_input.value = current_element.burning_likelihood
    burn_time_input.value = current_element.burn_time
    burning_turn_into_input.value = current_element.burning_turn_into

    // change reactions
    const reactions_div = document.getElementById("reactions")
    document.querySelectorAll("#reactions .reaction").forEach(child => child.remove()) // remove old reactions
    current_element.reactions.forEach(reaction => {
        // add new reactions
        let element = create_new_reaction_element()
        reactions_div.appendChild(element)
        let inputs = element.childNodes.filter(child => child.tagName === "INPUT")
        inputs[0].value = reaction.reacting_with
        inputs[1].value = reaction.react_into
        inputs[2].value = reaction.other_react_into
    })
}
element_selector.addEventListener("change", change_elements)

// updating reactions
const update_reactions = () => {
    let reactions = []
    document.querySelectorAll(".reaction").forEach(reaction => {
        const input_children = [...reaction.childNodes].filter(child => child.tagName === "INPUT")
        reactions.push(new Reaction(input_children[0].value, input_children[1].value, input_children[2].value))
    })
    current_element.reactions = reactions
}
setInterval(update_reactions, 100) // disgusting

// prevent from accidentally exiting with unsaved work
window.addEventListener("beforeunload", event => {
    event.preventDefault()
    event.returnValue = ""
})

window.addEventListener("load", () => {
    element_selector.selectedIndex = 0
    // ability to create new elements
    document.getElementById("new_element").onclick = () => {
        elements.push(create_new_element())
        update_element_selector()
        element_selector.selectedIndex = elements.length - 1
        change_elements()
    }
})
