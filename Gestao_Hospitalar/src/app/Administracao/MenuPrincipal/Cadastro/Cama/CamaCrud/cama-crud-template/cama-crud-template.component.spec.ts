import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaCrudTemplateComponent } from './cama-crud-template.component';

describe('CamaCrudTemplateComponent', () => {
  let component: CamaCrudTemplateComponent;
  let fixture: ComponentFixture<CamaCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamaCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(CamaCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
