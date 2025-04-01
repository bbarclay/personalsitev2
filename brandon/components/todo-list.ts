import { TodoService } from '../services/todo-service';
import { TodoItem } from './todo-item';
// import { Todo } from '../models/todo';

export class TodoList {
    private todoService: TodoService;
    private listElement: HTMLUListElement;

    constructor(todoService: TodoService) {
        this.todoService = todoService;
        this.listElement = document.createElement('ul');
    }

    render(): HTMLElement {
        this.listElement.innerHTML = '';
        const todos = this.todoService.getTodos();
        todos.forEach(todo => {
            const todoItem = new TodoItem(todo, this.todoService);
            this.listElement.appendChild(todoItem.render());
        });

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = 'Add a new todo';

        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => {
            if (inputElement.value) {
                const newTodo = this.todoService.addTodo(inputElement.value);
                const todoItem = new TodoItem(newTodo, this.todoService);
                this.listElement.appendChild(todoItem.render());
                inputElement.value = '';
            }
        });

        const container = document.createElement('div');
        container.appendChild(this.listElement);
        container.appendChild(inputElement);
        container.appendChild(addButton);

        return container;
    }
}
