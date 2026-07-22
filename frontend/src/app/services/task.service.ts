import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api/tasks/';

  private refreshRequired = new Subject<void>();

  refreshRequired$ = this.refreshRequired.asObservable();

  triggerRefresh() {
    this.refreshRequired.next();
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}${id}/`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
  searchTasks(search: string) {
    return this.http.get<Task[]>(`${this.apiUrl}?search=${search}`);
  }
  filterTasks(status: string) {
    return this.http.get<Task[]>(
        `${this.apiUrl}?status=${status}`
    );
}
}
