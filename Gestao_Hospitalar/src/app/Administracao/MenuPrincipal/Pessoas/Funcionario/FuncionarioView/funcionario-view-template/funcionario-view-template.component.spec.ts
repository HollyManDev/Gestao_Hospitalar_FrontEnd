import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioViewTemplateComponent } from './funcionario-view-template.component';

describe('FuncionarioViewTemplateComponent', () => {
  let component: FuncionarioViewTemplateComponent;
  let fixture: ComponentFixture<FuncionarioViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioViewTemplateComponent]
    });
    fixture = TestBed.createComponent(FuncionarioViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
