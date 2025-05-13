import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask = '';
  editTaskId: string | null = null;
  editedName: string = '';
  searchTerm: string = '';
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  filterTasks() {
    if (!this.searchTerm.trim()) {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => 
        task.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  addTask(): void {
    if (!this.newTask.trim()) return;

    this.taskService.addTask(this.newTask).subscribe((task) => {
      this.tasks.push(task);
      this.newTask = '';
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t._id !== id);
    });
  }

  toggleTask(task: Task): void {
    this.taskService.toggleTask(task).subscribe((updated) => {
      task.completed = updated.completed;
    });
  }

  startEdit(task: Task) {
    this.editTaskId = task._id!;
    this.editedName = task.name;
  }
  
  cancelEdit() {
    this.editTaskId = null;
    this.editedName = '';
  }
  
  saveEdit(task: Task) {
    if (!this.editedName.trim()) return;
  
    this.taskService.updateTaskName(task._id!, this.editedName).subscribe(updatedTask => {
      task.name = updatedTask.name;
      this.cancelEdit();
    });
  }
}