import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css'
})
export class TaskModal implements OnInit {

  @Input() task: Task | null = null;

  @Output() close = new EventEmitter<void>();

  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  private taskService = inject(TaskService);

  form = this.fb.group({

    title: ['', Validators.required],

    description: [''],

    status: ['Pending', Validators.required],

    due_date: ['', Validators.required]

  });

  ngOnInit() {

    if (this.task) {

      this.form.patchValue(this.task);

    }

  }

  submit() {

  if (this.form.invalid) return;

  const taskData = this.form.getRawValue() as Task;

  if (this.task) {

    this.taskService.updateTask(this.task.id!, taskData).subscribe({

      next: () => {
        this.saved.emit();
      },

      error: (err) => console.error(err)

    });

  } else {

    this.taskService.createTask(taskData).subscribe({

      next: () => {
        this.saved.emit();
      },

      error: (err) => console.error(err)

    });

  }

}

}