import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/dashboard/todo';



@Injectable({
    providedIn: 'root'
})
export class todoService {

    baseUrl = 'http://localhost:4200';
    constructor(private http: HttpClient) {

    }

    getTodoList() {
        return this.http.get<Todo[]>(`${this.baseUrl}/assets/demo/data/db.json`);
    }

    addTodo(postData: Todo) {
        return this.http.post(`${this.baseUrl}/assets/demo/data/db.json`, postData);
    }

    updateTodo(postData: Todo) {
        return this.http.patch(`${this.baseUrl}/assets/demo/data/db.json/${postData.id}`, postData);
    }

    deleteTodo(id: Todo['id']) {
        return this.http.delete(`${this.baseUrl}/assets/demo/data/db.json/${id}`);
    }

}