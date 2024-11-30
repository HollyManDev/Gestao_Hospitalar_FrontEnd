import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescricaoViewComponent } from './prescricao-view.component';

describe('PrescricaoViewComponent', () => {
  let component: PrescricaoViewComponent;
  let fixture: ComponentFixture<PrescricaoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescricaoViewComponent]
    });
    fixture = TestBed.createComponent(PrescricaoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
