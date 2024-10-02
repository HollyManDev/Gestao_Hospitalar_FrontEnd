import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioTemplateDataComponent } from './funcionario-template-data.component';

describe('FuncionarioTemplateDataComponent', () => {
  let component: FuncionarioTemplateDataComponent;
  let fixture: ComponentFixture<FuncionarioTemplateDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioTemplateDataComponent]
    });
    fixture = TestBed.createComponent(FuncionarioTemplateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
