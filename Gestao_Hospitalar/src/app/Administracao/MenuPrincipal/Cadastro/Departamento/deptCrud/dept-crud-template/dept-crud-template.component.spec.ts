import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptCrudTemplateComponent } from './dept-crud-template.component';

describe('DeptCrudTemplateComponent', () => {
  let component: DeptCrudTemplateComponent;
  let fixture: ComponentFixture<DeptCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(DeptCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
