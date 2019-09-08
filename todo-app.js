const template = document.createElement('template');
template.innerHTML = `
<input type="text" placeholder="Add a new to do"></input>
<button>✅</button>
<ul id="todos"></ul>
`;

class TodoApp extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({'mode': 'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$todoList = this._shadowRoot.querySelector('ul');
    }
}

window.customElements.define('todo-app', TodoApp);