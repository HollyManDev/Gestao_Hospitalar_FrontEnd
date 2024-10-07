import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoViewTemplateComponent } from './cargo-view-template.component';

describe('CargoViewTemplateComponent', () => {
  let component: CargoViewTemplateComponent;
  let fixture: ComponentFixture<CargoViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoViewTemplateComponent]
    });
    fixture = TestBed.createComponent(CargoViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
