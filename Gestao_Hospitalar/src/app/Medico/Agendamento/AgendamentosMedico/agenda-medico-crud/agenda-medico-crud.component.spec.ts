import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMedicoCrudComponent } from './agenda-medico-crud.component';

describe('AgendaMedicoCrudComponent', () => {
  let component: AgendaMedicoCrudComponent;
  let fixture: ComponentFixture<AgendaMedicoCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaMedicoCrudComponent]
    });
    fixture = TestBed.createComponent(AgendaMedicoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
