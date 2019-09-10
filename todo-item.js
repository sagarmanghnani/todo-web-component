
const templates = document.createElement('template');
templates.innerHTML = 
`
<style>
    :host {
    display: block;
    font-family: sans-serif;
    }

    .completed {
    text-decoration: line-through;
    }

    button {
    border: none;
    cursor: pointer;
    }
</style>
<li class="item">
    <input type="checkbox">
    <label></label>
    <button>❌</button>
</li>`

class TodoItem extends HTMLElement{
    //here this represents object of the class
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({'mode':'open'});
        this._shadowRoot.appendChild(templates.content.cloneNode(true));
        this.$item = this._shadowRoot.querySelector('li');
        this.$removeButton = this._shadowRoot.querySelector('button');
        console.log(this.$item);
        this.$text = this._shadowRoot.querySelector('label');
        this.$checkbox = this._shadowRoot.querySelector('input');

        this.$removeButton.addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index}) )
        });

        this.$checkbox.addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('onToggle', {detail: this.index}))
        })
    }

    connectedCallback(){
        // We set a default attribute here; if our end user hasn't provided one,
        // our element will display a "placeholder" text instead.
        if(!this.hasAttribute('text')) {
            this.setAttribute('text', 'placeholder');
        }
        this._renderTodoItem();
    }

    _renderTodoItem(){
        if(this.hasAttribute('checked')) {
            this.$item.classList.add('completed');
            this.$checkbox.setAttribute('checked', '');
        }else{
            if(this.$item.classList.contains('checked')){
                this.$item.classList.remove('completed');
            }
            this.$checkbox.removeAttribute('checked');
            
        }
        this.$text.innerHTML = this._text;
    }

   

    get checked(){
        return this.hasAttribute('checked');
    }

    set checked(val){
        if(val){
            this.setAttribute('checked', '');
        }else{
            this.removeAttribute('checked');
        }
    }

    set index(val){
        this.setAttribute('index', val);
    }

    get index(){
        return this._index;
    }

    static get observedAttributes(){
        return ['text','checked', 'index'];
    }

    //this method is called when todo-app changes the attribute of the todo-item, observedAttributes is monitoring 
    //over the values of the attributes ,and as soon as attribute recieves new values attributeChangedCallback function 
    //is called
    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case 'text':{
                this._text = newValue;
                break;
            }
            case 'checked':{
                this._checked = this.hasAttribute('checked');
                break;
            }

            case 'index': {
                this._index = parseInt(newValue);
                break;
            }
        }
    }
}

window.customElements.define('todo-item', TodoItem);