import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptViewTemplateComponent } from './dept-view-template.component';

describe('DeptViewTemplateComponent', () => {
  let component: DeptViewTemplateComponent;
  let fixture: ComponentFixture<DeptViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeptViewTemplateComponent]
    });
    fixture = TestBed.createComponent(DeptViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
