import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BookModel } from '@book-co/shared-models';

@Component({
  selector: 'bco-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent {
  originalBook: BookModel | undefined;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  bookForm = new FormGroup({
    name: new FormControl(''),
    earnings: new FormControl(0),
    description: new FormControl(''),
  });

  @Input() set book(book: BookModel | null) {
    this.bookForm.reset();
    this.originalBook = undefined;

    if (book) {
      this.bookForm.setValue({
        name: book.name,
        earnings: book.earnings,
        description: book.description,
      });

      this.originalBook = book;
    }
  }

  onSubmit(book: BookModel) {
    this.save.emit({ ...this.originalBook, ...book });
  }
}
