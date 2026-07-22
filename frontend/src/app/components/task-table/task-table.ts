
import { CommonModule,DatePipe } from '@angular/common';
import { Task } from '../../models/task';
import { StatusBadge } from '../status-badge/status-badge';
import { Output, EventEmitter, Input,Component } from '@angular/core';
@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    StatusBadge
  ],
  templateUrl: './task-table.html',
  styleUrl: './task-table.css'
})
export class TaskTable {

  @Input() tasks: Task[] = [];

  @Input() loading = false;
  @Output() edit = new EventEmitter<Task>();

@Output() delete = new EventEmitter<number>();

}