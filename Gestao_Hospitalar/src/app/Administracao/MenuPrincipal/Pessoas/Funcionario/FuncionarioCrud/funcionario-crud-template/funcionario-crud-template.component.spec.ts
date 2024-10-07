import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioCrudTemplateComponent } from './funcionario-crud-template.component';

describe('FuncionarioCrudTemplateComponent', () => {
  let component: FuncionarioCrudTemplateComponent;
  let fixture: ComponentFixture<FuncionarioCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(FuncionarioCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
