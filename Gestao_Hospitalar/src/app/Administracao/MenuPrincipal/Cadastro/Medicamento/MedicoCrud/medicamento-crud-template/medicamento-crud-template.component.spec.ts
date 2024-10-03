import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoCrudTemplateComponent } from './medicamento-crud-template.component';

describe('MedicamentoCrudTemplateComponent', () => {
  let component: MedicamentoCrudTemplateComponent;
  let fixture: ComponentFixture<MedicamentoCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentoCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(MedicamentoCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
