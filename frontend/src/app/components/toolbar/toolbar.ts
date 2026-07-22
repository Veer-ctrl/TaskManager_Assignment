import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {

  search = '';
  status = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() newTask = new EventEmitter<void>();

  onSearch() {
    this.searchChange.emit(this.search);
  }

  onStatusChange() {
    this.statusChange.emit(this.status);
  }

  openModal() {
    this.newTask.emit();
  }

}