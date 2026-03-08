import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TaskCommentsModalComponent } from './components/task-comments-modal/task-comments-modal.component';
import { TaskFormModalComponent } from './components/task-form-modal/task-form-modal.component';
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    TaskCommentsModalComponent,
    TaskFormModalComponent,
    MainContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'go-task';
}
