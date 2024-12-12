import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbGradesMicroComponent } from './bmb-grades-micro.component';
import { ComponentRef } from '@angular/core';

describe('BmbGradesMicroComponent', () => {
  let component: BmbGradesMicroComponent;
  let fixture: ComponentFixture<BmbGradesMicroComponent>;
  let componentRef: ComponentRef<BmbGradesMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbGradesMicroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbGradesMicroComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('gradeTitle', 'Período actual');
    componentRef.setInput('title', 'Semestral AGO-DIC 2024');
    componentRef.setInput('accredited', { name: 'Créditos aprobados', value: '39' });
    componentRef.setInput('average', { name: 'Promedio acumulado', value: '90' });
    componentRef.setInput('summary', { name: 'Faltas totales', value: '3' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
