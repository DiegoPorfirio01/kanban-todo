import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormModalComponent } from './task-form-modal.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';

describe('TaskFormModalComponent', () => {
  let component: TaskFormModalComponent;
  let fixture: ComponentFixture<TaskFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormModalComponent],
      providers: [{ provide: DIALOG_DATA, useValue: { mode: 'create' } }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
