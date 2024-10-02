import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorViewTemplateComponent } from './fornecedor-view-template.component';

describe('FornecedorViewTemplateComponent', () => {
  let component: FornecedorViewTemplateComponent;
  let fixture: ComponentFixture<FornecedorViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorViewTemplateComponent]
    });
    fixture = TestBed.createComponent(FornecedorViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
