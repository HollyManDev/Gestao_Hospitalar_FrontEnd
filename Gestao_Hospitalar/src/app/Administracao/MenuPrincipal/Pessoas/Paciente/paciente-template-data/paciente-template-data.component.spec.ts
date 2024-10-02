import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteTemplateDataComponent } from './paciente-template-data.component';

describe('PacienteTemplateDataComponent', () => {
  let component: PacienteTemplateDataComponent;
  let fixture: ComponentFixture<PacienteTemplateDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteTemplateDataComponent]
    });
    fixture = TestBed.createComponent(PacienteTemplateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
