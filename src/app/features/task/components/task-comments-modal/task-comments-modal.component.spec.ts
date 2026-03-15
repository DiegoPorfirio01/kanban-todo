import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { TaskCommentsModalComponent } from './task-comments-modal.component';

describe('TaskCommentsModalComponent', () => {
  let component: TaskCommentsModalComponent;
  let fixture: ComponentFixture<TaskCommentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCommentsModalComponent],
      providers: [
        { provide: DIALOG_DATA, useValue: { name: '', description: '', comments: [] } },
        { provide: DialogRef, useValue: { close: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

