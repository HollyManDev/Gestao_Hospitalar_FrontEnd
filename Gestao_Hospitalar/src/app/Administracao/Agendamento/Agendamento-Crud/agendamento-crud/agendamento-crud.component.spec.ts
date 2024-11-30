import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoCrudComponent } from './agendamento-crud.component';

describe('AgendamentoCrudComponent', () => {
  let component: AgendamentoCrudComponent;
  let fixture: ComponentFixture<AgendamentoCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentoCrudComponent]
    });
    fixture = TestBed.createComponent(AgendamentoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
