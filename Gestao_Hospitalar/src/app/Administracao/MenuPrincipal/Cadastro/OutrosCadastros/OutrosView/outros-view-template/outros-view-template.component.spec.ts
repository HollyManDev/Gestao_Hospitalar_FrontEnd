import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrosViewTemplateComponent } from './outros-view-template.component';

describe('OutrosViewTemplateComponent', () => {
  let component: OutrosViewTemplateComponent;
  let fixture: ComponentFixture<OutrosViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutrosViewTemplateComponent]
    });
    fixture = TestBed.createComponent(OutrosViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
