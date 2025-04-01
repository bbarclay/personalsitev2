import { Todo } from '../models/todo';

export class TodoService {
    private todos: Todo[] = [];
    private nextId: number = 1;

    constructor() {
        this.todos = [
            new Todo(this.nextId++, 'Learn TypeScript', true),
            new Todo(this.nextId++, 'Build a Todo App', false),
        ];
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    addTodo(title: string): Todo {
        const newTodo = new Todo(this.nextId++, title, false);
        this.todos.push(newTodo);
        return newTodo;
    }

    toggleComplete(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    deleteTodo(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}
