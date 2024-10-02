import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeCrudTemplateComponent } from './espe-crud-template.component';

describe('EspeCrudTemplateComponent', () => {
  let component: EspeCrudTemplateComponent;
  let fixture: ComponentFixture<EspeCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspeCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(EspeCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
