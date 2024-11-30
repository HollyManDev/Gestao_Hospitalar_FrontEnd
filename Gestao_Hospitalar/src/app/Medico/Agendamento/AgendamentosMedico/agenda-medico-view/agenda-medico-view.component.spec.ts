import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMedicoViewComponent } from './agenda-medico-view.component';

describe('AgendaMedicoViewComponent', () => {
  let component: AgendaMedicoViewComponent;
  let fixture: ComponentFixture<AgendaMedicoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaMedicoViewComponent]
    });
    fixture = TestBed.createComponent(AgendaMedicoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
