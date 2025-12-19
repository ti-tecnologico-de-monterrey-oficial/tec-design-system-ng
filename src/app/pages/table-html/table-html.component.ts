import { Component } from '@angular/core';
import data from './MOCK_DATA.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-html',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-html.component.html',
  styleUrl: './table-html.component.scss',
})
export class TableHtmlComponent {
  users = data;
}
