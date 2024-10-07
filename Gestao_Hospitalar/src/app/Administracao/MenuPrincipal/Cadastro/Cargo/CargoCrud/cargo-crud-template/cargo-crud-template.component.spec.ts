import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoCrudTemplateComponent } from './cargo-crud-template.component';

describe('CargoCrudTemplateComponent', () => {
  let component: CargoCrudTemplateComponent;
  let fixture: ComponentFixture<CargoCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(CargoCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
