import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Toolbar } from '../toolbar/toolbar';
import { TaskTable } from '../task-table/task-table';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskModal } from '../task-modal/task-modal';
@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, Toolbar, TaskTable, TaskModal],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage implements OnInit {
  private taskService = inject(TaskService);

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  username = '';

  loading = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  search = '';
  selectedStatus = '';
  selectedTask: Task | null = null;

  isModalOpen = false;

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.username = user.username;
      },
    });

    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = [...tasks];
        this.loading = false;
      },

      error: () => {
        this.loading = false;
      },
    });
  }
  onSearch(search: string) {
    this.search = search;

    this.applyFilters();
  }

  onStatus(status: string) {
    this.selectedStatus = status;

    this.applyFilters();
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(this.search.toLowerCase());

      const matchesStatus = !this.selectedStatus || task.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  openCreateModal() {
    this.selectedTask = null;

    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  onTaskSaved() {
    this.isModalOpen = false;
    this.loadTasks();
  }
  editTask(task: Task) {
    this.selectedTask = task;

    this.isModalOpen = true;
  }

  deleteTask(id: number) {
    if (!confirm('Delete this task?')) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },

      error: (err) => console.error(err),
    });
  }
  logout() {
    this.authService.logout();

    this.router.navigateByUrl('/login', {
      replaceUrl: true,
    });
  }
}
