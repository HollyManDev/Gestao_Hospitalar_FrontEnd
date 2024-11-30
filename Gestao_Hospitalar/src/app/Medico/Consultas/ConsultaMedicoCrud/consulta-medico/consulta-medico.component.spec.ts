import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMedicoComponent } from './consulta-medico.component';

describe('ConsultaMedicoComponent', () => {
  let component: ConsultaMedicoComponent;
  let fixture: ComponentFixture<ConsultaMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaMedicoComponent]
    });
    fixture = TestBed.createComponent(ConsultaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
