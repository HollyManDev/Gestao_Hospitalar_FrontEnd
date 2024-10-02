import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoViewTemplateComponent } from './medico-view-template.component';

describe('MedicoViewTemplateComponent', () => {
  let component: MedicoViewTemplateComponent;
  let fixture: ComponentFixture<MedicoViewTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicoViewTemplateComponent]
    });
    fixture = TestBed.createComponent(MedicoViewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
