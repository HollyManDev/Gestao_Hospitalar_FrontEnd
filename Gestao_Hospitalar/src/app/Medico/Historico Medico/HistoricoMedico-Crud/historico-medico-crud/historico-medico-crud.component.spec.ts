import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMedicoCrudComponent } from './historico-medico-crud.component';

describe('HistoricoMedicoCrudComponent', () => {
  let component: HistoricoMedicoCrudComponent;
  let fixture: ComponentFixture<HistoricoMedicoCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoMedicoCrudComponent]
    });
    fixture = TestBed.createComponent(HistoricoMedicoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
