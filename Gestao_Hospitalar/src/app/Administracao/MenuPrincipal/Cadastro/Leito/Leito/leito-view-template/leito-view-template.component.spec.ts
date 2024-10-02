import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitoViewTemplateComponent } from './leito-view-template.component';

describe('LeitoViewTemplateComponent', () => {
  let component: LeitoViewTemplateComponent;
  let fixture: ComponentFixture<LeitoViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeitoViewTemplateComponent]
    });
    fixture = TestBed.createComponent(LeitoViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
