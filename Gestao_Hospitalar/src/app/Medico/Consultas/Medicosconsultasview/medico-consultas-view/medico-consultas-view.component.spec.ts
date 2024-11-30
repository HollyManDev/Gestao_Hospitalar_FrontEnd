import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoConsultasViewComponent } from './medico-consultas-view.component';

describe('MedicoConsultasViewComponent', () => {
  let component: MedicoConsultasViewComponent;
  let fixture: ComponentFixture<MedicoConsultasViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicoConsultasViewComponent]
    });
    fixture = TestBed.createComponent(MedicoConsultasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
