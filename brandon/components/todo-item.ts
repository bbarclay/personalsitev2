import { Todo } from '../models/todo';
import { TodoService } from '../services/todo-service';

export class TodoItem {
    private todo: Todo;
    private todoService: TodoService;
    private listItem: HTMLLIElement;

    constructor(todo: Todo, todoService: TodoService) {
        this.todo = todo;
        this.todoService = todoService;
        this.listItem = document.createElement('li');
    }

    render(): HTMLElement {
        this.listItem.textContent = `${this.todo.title} - Completed: ${this.todo.completed}`;

        const toggleButton = document.createElement('button');
        toggleButton.textContent = this.todo.completed ? 'Mark Incomplete' : 'Mark Complete';
        toggleButton.addEventListener('click', () => {
            this.todoService.toggleComplete(this.todo.id);
            this.todo.completed = !this.todo.completed;
            this.render();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            this.todoService.deleteTodo(this.todo.id);
            this.listItem.remove();
        });

        this.listItem.innerHTML = '';
        this.listItem.textContent = `${this.todo.title} - Completed: ${this.todo.completed} `;
        this.listItem.appendChild(toggleButton);
        this.listItem.appendChild(deleteButton);

        return this.listItem;
    }
}
