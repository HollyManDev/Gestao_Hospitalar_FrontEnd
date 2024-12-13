import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosCrudTemplateComponent } from './produtos-crud-template.component';

describe('ProdutosCrudTemplateComponent', () => {
  let component: ProdutosCrudTemplateComponent;
  let fixture: ComponentFixture<ProdutosCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(ProdutosCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
