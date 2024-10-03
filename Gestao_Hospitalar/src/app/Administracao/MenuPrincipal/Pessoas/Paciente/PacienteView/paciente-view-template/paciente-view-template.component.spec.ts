import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteViewTemplateComponent } from './paciente-view-template.component';

describe('PacienteViewTemplateComponent', () => {
  let component: PacienteViewTemplateComponent;
  let fixture: ComponentFixture<PacienteViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteViewTemplateComponent]
    });
    fixture = TestBed.createComponent(PacienteViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
