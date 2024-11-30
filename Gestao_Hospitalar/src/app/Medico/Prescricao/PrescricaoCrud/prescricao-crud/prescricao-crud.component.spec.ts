import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricaoCrudComponent } from './prescricao-crud.component';

describe('PrescricaoCrudComponent', () => {
  let component: PrescricaoCrudComponent;
  let fixture: ComponentFixture<PrescricaoCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescricaoCrudComponent]
    });
    fixture = TestBed.createComponent(PrescricaoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
