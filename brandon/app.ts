import express from 'express';
import { TodoService } from './services/todo-service';

document.addEventListener('DOMContentLoaded', () => {
    const todoService = new TodoService();
    const appElement = document.getElementById('app');
    if (appElement) {
    } else {
        console.error('App element not found');
    }
});
