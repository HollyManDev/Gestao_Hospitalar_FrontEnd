import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngendamentoViewComponent } from './angendamento-view.component';

describe('AngendamentoViewComponent', () => {
  let component: AngendamentoViewComponent;
  let fixture: ComponentFixture<AngendamentoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngendamentoViewComponent]
    });
    fixture = TestBed.createComponent(AngendamentoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
