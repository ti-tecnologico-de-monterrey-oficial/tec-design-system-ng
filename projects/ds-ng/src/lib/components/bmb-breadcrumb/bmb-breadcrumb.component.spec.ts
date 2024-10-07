import { TestBed } from '@angular/core/testing';
import { BmbBreadcrumbComponent } from './bmb-breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

describe('BmbBreadcrumbComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        RouterTestingModule,
        BmbIconComponent,
      ],
      declarations: [BmbBreadcrumbComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BmbBreadcrumbComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
