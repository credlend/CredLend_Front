import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelcontroleComponent } from './painelcontrole.component';

describe('PainelcontroleComponent', () => {
  let component: PainelcontroleComponent;
  let fixture: ComponentFixture<PainelcontroleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PainelcontroleComponent]
    });
    fixture = TestBed.createComponent(PainelcontroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
