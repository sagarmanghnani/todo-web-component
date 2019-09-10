

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
        this.$input = this._shadowRoot.querySelector('input');
        this.$submitButton = this._shadowRoot.querySelector('button');
        this.$submitButton.addEventListener('click', this._addTodo.bind(this));
    }

    _renderTodoList(){
        this.$todoList.innerHTML = '';
        this._todos.forEach((todo, index) => {
            let $todoItem = document.createElement('todo-item');
            $todoItem.setAttribute('text', todo.text)
            if(todo.checked){
                //this will add attribute checked to todo-item with attribute value to true
                $todoItem.setAttribute('checked', '');
            }
            $todoItem.setAttribute('index', index);
            $todoItem.addEventListener('onRemove', this._removeTodo.bind(this));
            $todoItem.addEventListener('onToggle', this._toggleTodo.bind(this));
            this.$todoList.appendChild($todoItem);
        });
    }

    _addTodo(){
        if(this.$input.value.length > 0){
            this._todos.push({
                text:this.$input.value, checked: false
            });
            this._renderTodoList();
            this.$input.value = '';
        }
    }

    _removeTodo(e) {
        this._todos.splice(e.detail, 1);
        this._renderTodoList();
    }

    _toggleTodo(e) {
        const todo = this._todo[e.detail];
        this._todo[e.detail] = Object.assign({}, todo, {
            checked: !todo.checked
        });
        this._renderTodoList();
    }

    set todos(value){
        this._todos = value;
        this._renderTodoList();
    }

    get todos(){
        return this._todos;
    }
}

window.customElements.define('todo-app', TodoApp);

document.querySelector('todo-app').todos = [
    {text: "Make a to-do list", checked: true}, 
    {text: "Finish blog post", checked: true}
]