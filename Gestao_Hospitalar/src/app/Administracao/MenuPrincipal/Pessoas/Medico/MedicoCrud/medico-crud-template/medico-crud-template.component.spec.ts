import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoCrudTemplateComponent } from './medico-crud-template.component';

describe('MedicoCrudTemplateComponent', () => {
  let component: MedicoCrudTemplateComponent;
  let fixture: ComponentFixture<MedicoCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicoCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(MedicoCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
