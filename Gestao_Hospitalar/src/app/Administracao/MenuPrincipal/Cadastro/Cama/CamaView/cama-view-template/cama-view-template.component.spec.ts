import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaViewTemplateComponent } from './cama-view-template.component';

describe('CamaViewTemplateComponent', () => {
  let component: CamaViewTemplateComponent;
  let fixture: ComponentFixture<CamaViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamaViewTemplateComponent]
    });
    fixture = TestBed.createComponent(CamaViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
