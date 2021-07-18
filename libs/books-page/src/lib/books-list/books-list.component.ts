import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '@book-co/shared-models';

@Component({
  selector: 'bco-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  @Input() books: BookModel[] | null = [];
  @Input() readonly: boolean | null = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
}
