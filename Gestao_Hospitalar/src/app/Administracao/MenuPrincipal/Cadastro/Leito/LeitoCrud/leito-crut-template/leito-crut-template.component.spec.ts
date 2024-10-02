import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeitoCrutTemplateComponent } from './leito-crut-template.component';

describe('LeitoCrutTemplateComponent', () => {
  let component: LeitoCrutTemplateComponent;
  let fixture: ComponentFixture<LeitoCrutTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeitoCrutTemplateComponent]
    });
    fixture = TestBed.createComponent(LeitoCrutTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
