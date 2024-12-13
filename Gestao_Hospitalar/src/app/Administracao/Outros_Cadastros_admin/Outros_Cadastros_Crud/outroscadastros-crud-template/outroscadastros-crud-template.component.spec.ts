import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutroscadastrosCrudTemplateComponent } from './outroscadastros-crud-template.component';

describe('OutroscadastrosCrudTemplateComponent', () => {
  let component: OutroscadastrosCrudTemplateComponent;
  let fixture: ComponentFixture<OutroscadastrosCrudTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutroscadastrosCrudTemplateComponent]
    });
    fixture = TestBed.createComponent(OutroscadastrosCrudTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
