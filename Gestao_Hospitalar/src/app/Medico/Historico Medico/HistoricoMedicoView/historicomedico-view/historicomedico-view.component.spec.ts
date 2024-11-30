import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricomedicoViewComponent } from './historicomedico-view.component';

describe('HistoricomedicoViewComponent', () => {
  let component: HistoricomedicoViewComponent;
  let fixture: ComponentFixture<HistoricomedicoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricomedicoViewComponent]
    });
    fixture = TestBed.createComponent(HistoricomedicoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
