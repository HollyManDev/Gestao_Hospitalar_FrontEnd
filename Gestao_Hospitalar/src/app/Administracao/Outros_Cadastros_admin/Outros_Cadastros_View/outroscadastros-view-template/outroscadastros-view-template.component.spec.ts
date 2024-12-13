import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutroscadastrosViewTemplateComponent } from './outroscadastros-view-template.component';

describe('OutroscadastrosViewTemplateComponent', () => {
  let component: OutroscadastrosViewTemplateComponent;
  let fixture: ComponentFixture<OutroscadastrosViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutroscadastrosViewTemplateComponent]
    });
    fixture = TestBed.createComponent(OutroscadastrosViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
