import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCrudComponent } from './consulta-crud.component';

describe('ConsultaCrudComponent', () => {
  let component: ConsultaCrudComponent;
  let fixture: ComponentFixture<ConsultaCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaCrudComponent]
    });
    fixture = TestBed.createComponent(ConsultaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
