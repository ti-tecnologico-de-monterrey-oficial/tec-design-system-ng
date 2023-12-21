import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecDsNgComponent } from './tec-ds-ng.component';

describe('TecDsNgComponent', () => {
  let component: TecDsNgComponent;
  let fixture: ComponentFixture<TecDsNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecDsNgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecDsNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
