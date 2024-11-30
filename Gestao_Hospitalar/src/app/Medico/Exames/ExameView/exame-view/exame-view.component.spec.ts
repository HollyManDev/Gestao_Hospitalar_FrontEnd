import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameViewComponent } from './exame-view.component';

describe('ExameViewComponent', () => {
  let component: ExameViewComponent;
  let fixture: ComponentFixture<ExameViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExameViewComponent]
    });
    fixture = TestBed.createComponent(ExameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
