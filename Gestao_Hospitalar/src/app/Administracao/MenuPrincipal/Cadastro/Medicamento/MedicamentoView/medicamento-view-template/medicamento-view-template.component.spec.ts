import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoViewTemplateComponent } from './medicamento-view-template.component';

describe('MedicamentoViewTemplateComponent', () => {
  let component: MedicamentoViewTemplateComponent;
  let fixture: ComponentFixture<MedicamentoViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoViewTemplateComponent]
    });
    fixture = TestBed.createComponent(MedicamentoViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
