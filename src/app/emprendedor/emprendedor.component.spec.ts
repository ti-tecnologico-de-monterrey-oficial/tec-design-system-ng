import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprendedorComponent } from './emprendedor.component';

describe('EmprendedorComponent', () => {
  let component: EmprendedorComponent;
  let fixture: ComponentFixture<EmprendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprendedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
