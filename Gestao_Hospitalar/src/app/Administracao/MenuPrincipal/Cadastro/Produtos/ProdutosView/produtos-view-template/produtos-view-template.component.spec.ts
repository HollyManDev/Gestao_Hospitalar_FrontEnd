import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosViewTemplateComponent } from './produtos-view-template.component';

describe('ProdutosViewTemplateComponent', () => {
  let component: ProdutosViewTemplateComponent;
  let fixture: ComponentFixture<ProdutosViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosViewTemplateComponent]
    });
    fixture = TestBed.createComponent(ProdutosViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
