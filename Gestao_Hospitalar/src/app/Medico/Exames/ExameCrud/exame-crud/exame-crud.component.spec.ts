import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameCrudComponent } from './exame-crud.component';

describe('ExameCrudComponent', () => {
  let component: ExameCrudComponent;
  let fixture: ComponentFixture<ExameCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExameCrudComponent]
    });
    fixture = TestBed.createComponent(ExameCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
