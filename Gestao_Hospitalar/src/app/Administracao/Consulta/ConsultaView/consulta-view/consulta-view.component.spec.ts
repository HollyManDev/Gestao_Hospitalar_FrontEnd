import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaViewComponent } from './consulta-view.component';

describe('ConsultaViewComponent', () => {
  let component: ConsultaViewComponent;
  let fixture: ComponentFixture<ConsultaViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaViewComponent]
    });
    fixture = TestBed.createComponent(ConsultaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
