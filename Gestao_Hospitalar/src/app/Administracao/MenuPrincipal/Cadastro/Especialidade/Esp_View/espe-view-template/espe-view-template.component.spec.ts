import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeViewTemplateComponent } from './espe-view-template.component';

describe('EspeViewTemplateComponent', () => {
  let component: EspeViewTemplateComponent;
  let fixture: ComponentFixture<EspeViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspeViewTemplateComponent]
    });
    fixture = TestBed.createComponent(EspeViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
