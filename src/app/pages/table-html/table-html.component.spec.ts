import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHtmlComponent } from './table-html.component';

describe('TableHtmlComponent', () => {
  let component: TableHtmlComponent;
  let fixture: ComponentFixture<TableHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
