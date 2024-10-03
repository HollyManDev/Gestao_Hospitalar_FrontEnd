import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoViewTemplateComponent } from './equipamento-view-template.component';

describe('EquipamentoViewTemplateComponent', () => {
  let component: EquipamentoViewTemplateComponent;
  let fixture: ComponentFixture<EquipamentoViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipamentoViewTemplateComponent]
    });
    fixture = TestBed.createComponent(EquipamentoViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
