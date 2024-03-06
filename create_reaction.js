const reaction_html = `<div class="reaction">
When reacting with (raw element name): <input type="text" class="reacting_with"> <br>
React into (raw element name, null for destroy, leave empty for don't react): <input type="text" class="react_into"> <br>
Other element reacts into (raw element name, null for destroy, leave empty for don't react): <input type="text" class="reacts_into"> <br><br>
<button onclick="parentNode.remove()">Delete Reaction (Irreversible)</button>
</div><br>`;
const create_new_reaction_element = () => {
    let template = document.createElement("template")
    template.innerHTML = reaction_html
    return template.content.children[0]
}
