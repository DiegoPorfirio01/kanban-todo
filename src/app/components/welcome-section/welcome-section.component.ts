import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../services/modal-controller.service';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css',
})
export class WelcomeSectionComponent {
  private readonly _taskModalController = inject(ModalControllerService);

  constructor() {}

  openNewTaskModal() {
    this._taskModalController.openNewTaskModal();
  }
}
