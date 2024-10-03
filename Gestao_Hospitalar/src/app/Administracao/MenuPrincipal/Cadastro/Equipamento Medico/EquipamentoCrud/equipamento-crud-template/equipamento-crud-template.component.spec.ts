import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoCrudTemplateComponent } from './equipamento-crud-template.component';

describe('EquipamentoCrudTemplateComponent', () => {
  let component: EquipamentoCrudTemplateComponent;
  let fixture: ComponentFixture<EquipamentoCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipamentoCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(EquipamentoCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
