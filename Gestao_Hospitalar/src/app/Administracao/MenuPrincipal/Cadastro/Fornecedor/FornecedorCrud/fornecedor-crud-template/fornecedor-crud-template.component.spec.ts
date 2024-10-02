import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorCrudTemplateComponent } from './fornecedor-crud-template.component';

describe('FornecedorCrudTemplateComponent', () => {
  let component: FornecedorCrudTemplateComponent;
  let fixture: ComponentFixture<FornecedorCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(FornecedorCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
