import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCrudTemplateComponent } from './paciente-crud-template.component';

describe('PacienteCrudTemplateComponent', () => {
  let component: PacienteCrudTemplateComponent;
  let fixture: ComponentFixture<PacienteCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(PacienteCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
