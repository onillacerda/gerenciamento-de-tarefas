import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // ajuste se necessário

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(name: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { name, completed: false });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  toggleTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task._id}`, {
      ...task,
      completed: !task.completed
    });
  }

  updateTaskName(id: string, name: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, { name });
  }
}
